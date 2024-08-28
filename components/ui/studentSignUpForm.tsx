"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  parse,
  format,
  isValid,
  isBefore,
  subYears,
  differenceInYears,
} from "date-fns";
import DatePicker from "react-datepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter,useSearchParams } from "next/navigation"; 
import { useEffect } from 'react';


interface StudentSignupFormProps {
  onSubmit: (data: StudentFormValues) => void;
  programCode: string;
}
const calculateAge = (birthdate: Date | string): number => {
  const today = new Date();
  const birthDate = new Date(birthdate); // This works with both Date object and ISO string
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

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
  APPLYING_FOR: z.string().optional(),
  LEVEL: z.string().optional(),
  E_mail_main: z.string().optional(),
  E_NAME: z.string().optional(),
  E_TEL: z.string().optional(),
  ProgCode: z.string().optional(),
});

type StudentFormValues = z.infer<typeof formSchema>;

const StudentSignupForm: React.FC<StudentSignupFormProps> = ({ programCode, onSubmit }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [age, setAge] = useState<number>(0);
  const [tempDate, setTempDate] = useState<string>("");
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (sessionId && orderId) {
      // Store session_id and orderId in localStorage or state if needed
      localStorage.setItem('session_id', sessionId);
      localStorage.setItem('orderId', orderId);
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
      APPLYING_FOR: "",
      LEVEL: "",
      E_mail_main: "",
      E_NAME: "",
      E_TEL: "",
      ProgCode: programCode, // Set the program code here
    },
  });

  // const onSubmit = async (data: StudentFormValues) => {
  //   try {
  //     setLoading(true); // Set loading state to true
  //     const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/students/studentSignUp`;
  //     const seasonId = process.env.NEXT_PUBLIC_SEASON_ID; // Make sure this is the correct environment variable

  //     if (!seasonId) {
  //       throw new Error("Season ID is missing in environment variables");
  //     }
  //     if (!data.BRTHD) {
  //       throw new Error("Birthdate (BRTHD) is required.");
  //     }

  //     const requestBody = {
  //       ...data,
  //       seasonId, // Include the seasonId in the request body
  //       BRTHD: data.BRTHD.toISOString(), // Convert BRTHD to ISO string
  //       AGE: age, // Include the calculated AGE
  //       ProgCode: data.ProgCode || programCode, // Ensure ProgCode is set correctly
  //   };
  //     console.log("Request Body:", requestBody);

  //     // Make the POST request
  //     const response = await axios.post(apiUrl, requestBody);

  //     if (response.status === 200 || response.status === 201) {
  //       toast.success("Student data submitted successfully!");
  //       const storedStudents = JSON.parse(localStorage.getItem('submittedStudents') || '[]');
  //       storedStudents.push(requestBody);
  //       localStorage.setItem('submittedStudents', JSON.stringify(storedStudents));



  //       form.reset(); // Reset the form after a successful submission

  //       // Navigate to the success page
  //       router.push("/success");
  //     } else {
  //       toast.error("Failed to submit student data. Please try again.");
  //     }
  //   } catch (error) {
  //     const err = error as any; // or as Error
  //     console.error("Error submitting student data:", err);
  //     if (err.response?.data?.message) {
  //       toast.error(err.response.data.message);
  //     } else {
  //       toast.error("An error occurred while submitting the data.");
  //     }
  //   } finally {
  //     setLoading(false); // Reset loading state
  //   }
  // };


  const handleBirthdateChange = (value: Date) => {
    setSelectedDate(value);
    const newAge = calculateAge(value);
    setAge(newAge);
    form.setValue("AGE", newAge);
    form.setValue("BRTHD", value);
  };


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
    <Form {...form}>
      <form
        className="space-y-8 w-full"
        onSubmit={form.handleSubmit((data) => onSubmit(data))}// Ensure form submission is handled here
      >
        <div className="md:grid md:grid-cols-3 gap-8">
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
                    onBlur={(e) => handleBlur(e)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Input
                type="text"
                value={age !== null ? age.toString() : ""}
                readOnly
              />
            </FormControl>
          </FormItem>
          <FormField
            control={form.control}
            name="GradeLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Grade Level of student" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="K">Kindergarden</SelectItem>
                    <SelectItem value="1">1st</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="LEVEL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="E_mail_main"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Email</FormLabel>
                <FormControl>
                  <Input placeholder="Main Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="E_NAME"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Name</FormLabel>
                <FormControl>
                  <Input placeholder="Emergency Contact Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="E_TEL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Tel</FormLabel>
                <FormControl>
                  <Input placeholder="Emergency Contact Tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ProgCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program Code</FormLabel>
                <FormControl>
                  <Input placeholder="Program Code"
                  value={programCode}
                  onChange={(e) => field.onChange(e.target.value)}
                   />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export { StudentSignupForm };
export type { StudentFormValues };
