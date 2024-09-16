import axios from "axios";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  parse,
  isValid,
  differenceInYears,
} from 'date-fns'; // Add this import

import { useRouter, useSearchParams } from "next/navigation"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StudentSignupFormProps {
  onSubmit: (data: StudentFormValues) => void;
  programCode: string; // Add programCode prop
}

const formSchema = z.object({
  NAME_FIRST: z.string().min(1),
  NAME_LAST: z.string().min(1),
  HOME_TEL: z.string().optional(),
  ADDRESS: z.string().min(1),
  CITY: z.string().min(1),
  STATE: z.string().min(1),
  ZIP: z.string().min(1),
  Email_student: z.string().optional(),
  BRTHD: z.date().optional(),
  AGE: z.number(),
  GradeLevel: z.string().optional(),
  LEVEL: z.string().optional(),
  E_mail_main: z.string().optional(),
  E_NAME: z.string().optional(),
  E_TEL: z.string().optional(),
  ProgCode: z.string(), // Add ProgCode to schema
});

type StudentFormValues = z.infer<typeof formSchema>;

const StudentSignupForm: React.FC<StudentSignupFormProps> = ({
  programCode,
  onSubmit,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [age, setAge] = useState<number>(0);
  const [tempDate, setTempDate] = useState<string>("");
  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (sessionId && orderId) {
      localStorage.setItem("session_id", sessionId);
      localStorage.setItem("orderId", orderId);
    }
  }, [sessionId, orderId]);

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NAME_FIRST: "",
      NAME_LAST: "",
      HOME_TEL: "",
      ADDRESS: "",
      CITY: "",
      STATE: "",
      ZIP: "",
      Email_student: "",
      BRTHD: undefined,
      AGE: 0,
      GradeLevel: "",
      LEVEL: "",
      E_mail_main: "",
      E_NAME: "",
      E_TEL: "",
      ProgCode: programCode, // Set the program code here
    },
  });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    const parsedDate = parse(dateValue, "MM-dd-yyyy", new Date());
    if (isValid(parsedDate)) {
      const age = differenceInYears(new Date("2025-01-01"), parsedDate);
      if (age >= 5) {
        form.setValue("BRTHD", parsedDate);
        setAge(age);
      } else {
        form.setValue("BRTHD", undefined);
        setAge(0);
        alert("Student must be at least 5 years old as of January 1, 2025.");
      }
    } else {
      form.setValue("BRTHD", undefined);
      setAge(0);
      alert("Please enter a valid date.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Student Signup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit((data) => onSubmit(data))}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="NAME_FIRST"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="NAME_LAST"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Home Telephone */}
                <FormField
                  control={form.control}
                  name="HOME_TEL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Tel</FormLabel>
                      <FormControl>
                        <Input placeholder="Home Tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Address */}
                <FormField
                  control={form.control}
                  name="ADDRESS"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* City */}
                <FormField
                  control={form.control}
                  name="CITY"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* State */}
                <FormField
                  control={form.control}
                  name="STATE"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* ZIP */}
                <FormField
                  control={form.control}
                  name="ZIP"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP</FormLabel>
                      <FormControl>
                        <Input placeholder="ZIP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Student Email */}
                <FormField
                  control={form.control}
                  name="Email_student"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Student Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Birthdate */}
                <FormField
                  control={form.control}
                  name="BRTHD"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birthdate</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="MM-DD-YYYY"
                          value={tempDate}
                          onChange={(e) => setTempDate(e.target.value)}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Age */}
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="text" value={age.toString()} readOnly />
                  </FormControl>
                </FormItem>
                {/* Grade Level */}
                <FormField
                  control={form.control}
                  name="GradeLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade Level (Optional if doing program not friday related)</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Grade Level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="K">Kindergarten</SelectItem>
                          <SelectItem value="1">1st</SelectItem>
                          <SelectItem value="2">2nd</SelectItem>
                          <SelectItem value="3">3rd</SelectItem>
                          <SelectItem value="4">4th</SelectItem>
                          <SelectItem value="5">5th</SelectItem>
                          <SelectItem value="6">6th</SelectItem>
                          <SelectItem value="7">7th</SelectItem>
                          <SelectItem value="8">8th</SelectItem>
                          <SelectItem value="9">9th</SelectItem>
                          <SelectItem value="10">10th</SelectItem>
                          <SelectItem value="11">11th</SelectItem>
                          <SelectItem value="12">12th</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Level */}
                <FormField
                  control={form.control}
                  name="LEVEL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="6">6</SelectItem>
                          <SelectItem value="7">7</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Program Code */}
                <FormField
                  control={form.control}
                  name="ProgCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program Code</FormLabel>
                      <FormControl>
                        <Input value={programCode} readOnly  />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end mt-8">
                <Button type="submit" disabled={loading}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export { StudentSignupForm };
export type { StudentFormValues };
