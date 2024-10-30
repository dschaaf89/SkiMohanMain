"use client";
import { useRouter } from 'next/navigation';

import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CalendarIcon } from "lucide-react";
import "react-calendar/dist/Calendar.css";
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
  programs?: string;
  GreetTimeSlot:string; // Field for Greeter role
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
  programs: z.string().optional(), // Field for Greeter role
  files: z.array(z.any()).optional(),
  GreetTimeSlot:z.string().optional(),
});

type VolunteerFormValues = z.infer<typeof formSchema>;

export const VolunteerForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isProgramCoordinatorChecked, setIsProgramCoordinatorChecked] = useState(false);
  const [isBusChaperoneChecked, setIsBusChaperoneChecked] = useState(false);
  const [isEmergencyDriverChecked, setIsEmergencyDriverChecked] = useState(false);
  const [isGreeterChecked, setIsGreeterChecked] = useState(false);
  const router = useRouter();
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
      programs: "", // Default programs field value
      GreetTimeSlot:"",
    },
  });
  const onSubmit = async (data: VolunteerFormValues) => {
    try {
      setLoading(true);
  
      // Separate out the files from the rest of the form data
      const { files, ...formData } = data;
  
      // Send the form data to the backend
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/volunteers`, formData);
  
      // Prepare the FormData object for the files to send via Azure
      const formDataForFiles = new FormData();
      formDataForFiles.append("firstName", data.firstName);
      formDataForFiles.append("lastName", data.lastName);
      if (files && files.length > 0) {
        files.forEach((file) => {
          formDataForFiles.append("files", file, file.name);
        });
      }
  
      // Send the files to the Azure route for email
      await axios.post("/api/sendVolunteerDocs", formDataForFiles, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Volunteer created and email sent.");
  
      // Route to the main page after successful submission
      router.push(`/`);
      
    } catch (error: any) {
      console.error(error);
      toast.error(`Something went wrong: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
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
                  <Input disabled={loading} placeholder="First Name" {...field} />
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
                  <Input disabled={loading} placeholder="Last Name" {...field} />
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
                  <Input disabled={loading} placeholder="Address" {...field} />
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
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      onChange={(date) => field.onChange(date as Date)}
                      value={field.value}
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
                  <Input disabled={loading} placeholder="Cell Phone" {...field} />
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
                  <Input disabled={loading} placeholder="Home Phone" {...field} />
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
                  <Input disabled={loading} placeholder="Work Phone" {...field} />
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
                    onCheckedChange={(checked: boolean) => {
                      field.onChange(checked);
                      setIsProgramCoordinatorChecked(checked);
                    }}
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
                      setIsBusChaperoneChecked(checked);
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
                      setIsEmergencyDriverChecked(checked);
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
                    onCheckedChange={(checked: boolean) => {
                      field.onChange(checked);
                      setIsGreeterChecked(checked);
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Greeter</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {/* Conditional rendering of Employer School */}
          {(isProgramCoordinatorChecked || isBusChaperoneChecked || isEmergencyDriverChecked) && (
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
                        <SelectValue placeholder="Select Employer School" />
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
                      <SelectItem value="Thorton Creek">Thorton Creek</SelectItem>
                      <SelectItem value="Wallingford">Wallingford</SelectItem>
                      <SelectItem value="SouthJackon">South Jackson</SelectItem>
                      <SelectItem value="SalmonBay">Salmon Bay</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Conditional rendering of Programs field for Greeter */}
          {isGreeterChecked && (
            <FormField
              control={form.control}
              name="GreetTimeSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day and Time Slot</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SaturdayMorning">Saturday 10:30 AM - 12:30pm</SelectItem>
                      <SelectItem value="SaturdayAfternoon">Saturday 02:00pm - 04:00pm</SelectItem>
                      <SelectItem value="SundayMorning">Sunday 10:30 AM - 12:30pm</SelectItem>
                      <SelectItem value="SundayAfternoon">Sunday 02:00pm - 04:00pm</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

{isBusChaperoneChecked ? (
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
            ) : null}
            {/* Conditional rendering based on the checkbox state */}
            {isEmergencyDriverChecked ? (
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
            ) : null}
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
  );
};
