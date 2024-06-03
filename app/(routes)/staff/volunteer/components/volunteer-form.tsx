"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CalendarIcon } from "lucide-react";
import "react-calendar/dist/Calendar.css";
import { useRouter } from "next/router";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "react-calendar";

// Redefine Volunteer type
type Volunteer = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate?: Date;
  homePhone?: string;
  mobilePhone: string;
  workPhone?: string;
  Address: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  employerSchool?: string;
  occupationGrade?: string;
  isGreeter?: boolean;
  isProgramCoordinator?: boolean;
  isBusChaperone?: boolean;
  busChaperoneSchool?: string;
  isEmergencyDriver?: boolean;
  emergencyDriverDay?: string;
  applicantStatus?: string;
  agreeToTerms?: boolean;
  busChaperoneWk1?: boolean;
  busChaperoneWk2?: boolean;
  busChaperoneWk3?: boolean;
  busChaperoneWk4?: boolean;
  busChaperoneWk5?: boolean;
  busChaperoneWk6?: boolean;
  emergencyDriverWk1?: boolean;
  emergencyDriverWk2?: boolean;
  emergencyDriverWk3?: boolean;
  emergencyDriverWk4?: boolean;
  emergencyDriverWk5?: boolean;
  emergencyDriverWk6?: boolean;
  files: File[];
};

const formSchema = z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.date().optional(),
  homePhone: z.string().optional(),
  mobilePhone: z.string(),
  workPhone: z.string().optional(),
  Address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  email: z.string(),
  employerSchool: z.string().optional(),
  occupationGrade: z.string().optional(),
  isGreeter: z.boolean().optional(),
  isProgramCoordinator: z.boolean().optional(),
  isBusChaperone: z.boolean().optional(),
  busChaperoneSchool: z.string().optional(),
  isEmergencyDriver: z.boolean().optional(),
  emergencyDriverDay: z.string().optional(),
  applicantStatus: z.string().optional(),
  agreeToTerms: z.boolean().optional(),
  busChaperoneWk1: z.boolean().optional(),
  busChaperoneWk2: z.boolean().optional(),
  busChaperoneWk3: z.boolean().optional(),
  busChaperoneWk4: z.boolean().optional(),
  busChaperoneWk5: z.boolean().optional(),
  busChaperoneWk6: z.boolean().optional(),
  emergencyDriverWk1: z.boolean().optional(),
  emergencyDriverWk2: z.boolean().optional(),
  emergencyDriverWk3: z.boolean().optional(),
  emergencyDriverWk4: z.boolean().optional(),
  emergencyDriverWk5: z.boolean().optional(),
  emergencyDriverWk6: z.boolean().optional(),
  files: z.array(z.any()).optional(),
});

type VolunteerFormValues = z.infer<typeof formSchema>;

export const VolunteerForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isBusChaperoneChecked, setBusChaperoneChecked] = useState(false);
  const [isEmergencyDriverChecked, setEmergencyDriverChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      birthDate: new Date(),
      homePhone: "",
      mobilePhone: "",
      workPhone: "",
      Address: "",
      city: "",
      state: "",
      zipCode: "",
      email: "",
      employerSchool: "",
      occupationGrade: "",
      isGreeter: false,
      isProgramCoordinator: false,
      isBusChaperone: false,
      busChaperoneSchool: "",
      isEmergencyDriver: false,
      emergencyDriverDay: "",
      applicantStatus: "",
      agreeToTerms: false,
      busChaperoneWk1: false,
      busChaperoneWk2: false,
      busChaperoneWk3: false,
      busChaperoneWk4: false,
      busChaperoneWk5: false,
      busChaperoneWk6: false,
      emergencyDriverWk1: false,
      emergencyDriverWk2: false,
      emergencyDriverWk3: false,
      emergencyDriverWk4: false,
      emergencyDriverWk5: false,
      emergencyDriverWk6: false,
      files: [],
    },
  });

  const handleCheckboxChange = (type: 'busChaperone' | 'emergencyDriver', checked: boolean) => {
    if (type === 'busChaperone') {
      setBusChaperoneChecked(checked);
    } else if (type === 'emergencyDriver') {
      setEmergencyDriverChecked(checked);
    }
  };

  const handleBirthdateChange = (value: any) => {
    let date: Date | null = null;

    if (value instanceof Date) {
      date = value;
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      date = value[0];
    }

    setSelectedDate(date);
    form.setValue("birthDate", date ?? new Date());
  };

  const onSubmit = async (data: VolunteerFormValues) => {
    try {
      setLoading(true);

      // Create FormData for files
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);

      if (data.files && data.files.length > 0) {
        data.files.forEach((file) => {
          formData.append("files", file, file.name);
        });
      }

      // Log FormData entries
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      // Send email with documents
      console.log("Sending email with documents...");
      const emailResponse = await fetch("http://localhost:3001/api/sendVolunteerDocs", {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!emailResponse.ok) {
        throw new Error(`Email API error: ${emailResponse.statusText}`);
      }
      console.log("Email sent successfully.");

      // Send volunteer data as JSON
      console.log("Sending volunteer data...");
      const volunteerResponse = await fetch("http://localhost:3000/api/3523ea0b-4dc2-4efb-be8d-10e1740d2f63/volunteers", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        //
        credentials: 'include' // Ensure cookies are sent if needed
      });
     

      if (!volunteerResponse.ok) {
        throw new Error(`Volunteer API error: ${volunteerResponse.statusText}`);
      }
      console.log("Volunteer data sent successfully.");

      toast.success("Volunteer created and email sent.");
    } catch (error: any) {
      console.error(error);
      toast.error(`Something went wrong: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Zip" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        onChange={handleBirthdateChange}
                        value={selectedDate}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobilePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cell Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Cell Phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="homePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Home Phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Work Phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employerSchool"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employer School</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Ballard">Ballard</SelectItem>
                      <SelectItem value="Eastside Catholic">
                        Eastside Catholic
                      </SelectItem>
                      <SelectItem value="Interlake">Interlake</SelectItem>
                      <SelectItem value="Meadowbrook">Meadowbrook</SelectItem>
                      <SelectItem value="North East Seattle">
                        North East Seattle
                      </SelectItem>
                      <SelectItem value="Roosevelt">Roosevelt</SelectItem>
                      <SelectItem value="Soundview">Soundview</SelectItem>
                      <SelectItem value="Thorton Creek">
                        Thorton Creek
                      </SelectItem>
                      <SelectItem value="Wallingford">Wallingford</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupationGrade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Occupation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isProgramCoordinator"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Program Coordinator</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isBusChaperone"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked: boolean) => {
                        field.onChange(checked);
                        handleCheckboxChange('busChaperone', checked);
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Bus Chaperone</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isEmergencyDriver"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked: boolean) => {
                        field.onChange(checked);
                        handleCheckboxChange('emergencyDriver', checked);
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Emergency Driver</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isGreeter"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Greeter</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Agree to Terms</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {isBusChaperoneChecked && (
              <div className="scheduling">
                Scheduling
                <FormField
                  control={form.control}
                  name="busChaperoneWk1"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Bus Chaperone WK1</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="busChaperoneWk2"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Bus Chaperone WK2</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="busChaperoneWk3"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Bus Chaperone WK3</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="busChaperoneWk4"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Bus Chaperone WK4</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="busChaperoneWk5"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Bus Chaperone WK5</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="busChaperoneWk6"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Bus Chaperone WK6</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {isEmergencyDriverChecked && (
              <div className="scheduling">
                Scheduling
                <FormField
                  control={form.control}
                  name="emergencyDriverWk1"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Emergency Driver WK1</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyDriverWk2"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Emergency Driver WK2</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyDriverWk3"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Emergency Driver WK3</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyDriverWk4"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Emergency Driver WK4</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyDriverWk5"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Emergency Driver WK5</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyDriverWk6"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Emergency Driver WK6</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          <div className="flex justify-center mt-8">
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Forms</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="file"
                      multiple
                      onChange={(e) => field.onChange(Array.from(e.target.files || []))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center mt-8">
            <Button disabled={loading} className="mx-auto" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
