"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { parse } from "date-fns";
import { isValid } from "date-fns";
import { useState, useEffect } from "react";
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
  FormDescription,
} from "@/components/ui/form";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, differenceInYears, isBefore, subYears } from "date-fns";
import DatePicker from "react-datepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/ui/alert-modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Instructor } from "@/types";

type ClassTime = {
  id: number;
  label: string;
  day: string;
  startTime: string;
  endTime: string;
};
type InstructorWithClassTimeIds = Instructor & {
  classTimeIds?: number[];
};
interface InstructorClassTime {
  instructorId: string;
  classTimeId: number;
}

const ageRequest = [
  {
    id: "4-5",
    label: "4-5",
  },
  {
    id: "6-12",
    label: "6-12",
  },
  {
    id: "Teens",
    label: "Teens",
  },
  {
    id: "Adults",
    label: "Adults",
  },
  {
    id: "AllAges",
    label: "All Ages",
  },
] as const;

const classes = [
  {
    id: 1,
    label: "Thursday 7:00pm-9:00pm",
    day: "Thursday",
    startTime: "19:00",
    endTime: "21:00",
  },
  {
    id: 2,
    label: "Friday 7:00pm-9:00pm",
    day: "Friday",
    startTime: "19:00",
    endTime: "21:00",
  },
  {
    id: 3,
    label: "Saturday 1 10:30am-12:30pm",
    day: "Saturday",
    startTime: "10:30",
    endTime: "12:30",
  },
  {
    id: 4,
    label: "Saturday 2 2:00pm-4:00pm",
    day: "Saturday",
    startTime: "14:00",
    endTime: "16:00",
  },
  {
    id: 5,
    label: "Sunday 1 10:30am-12:30pm",
    day: "Sunday",
    startTime: "10:30",
    endTime: "12:30",
  },
  {
    id: 6,
    label: "Sunday 2 2:00pm-4:00pm",
    day: "Sunday",
    startTime: "14:00",
    endTime: "16:00",
  },
] as const;

const clinics = [
  {
    id: "1",
    label: "Dry Land#1 Tuesday December 5th 2023 7pm Zoom",
  },
  {
    id: "2",
    label: "Dry Land#1 Thursday December 7th 2023 7pm Zoom",
  },
  {
    id: "3",
    label: "On Snow Clinic#1 Saturday December 9th 2023 930am Summit Central",
  },
  {
    id: "4",
    label: "On Snow Clinic#1 Sunday December 10th 2023 930am Summit Central",
  },

  {
    id: "5",
    label: "Dry Land#2 Tuesday December 12th 2023 7pm Zoom",
  },
  {
    id: "6",
    label: "Dry Land#2 Thursday December 14th 2023 7pm Zoom",
  },
  {
    id: "7",
    label: "On Snow Clinic#2 Saturday December 16th 2023 930am Summit Central",
  },
  {
    id: "8",
    label: "On Snow Clinic#2 Sunday December 17th 2023 930am Summit Central",
  },
  {
    id: "9",
    label: "Dry Land#3 Tuesday December 19th 2023 7pm Zoom",
  },
  {
    id: "10",
    label: "Dry Land#3 Thursday December 21st 2023 7pm Zoom",
  },
  {
    id: "11",
    label: "On Snow Clinic#3 Saturday December 30th 2023 930am Summit Central",
  },
  {
    id: "12",
    label: "On Snow Clinic#3 Sunday December 31st 2023 930am Summit Central",
  },
  {
    id: "13",
    label: "Dry Land#4 Tuesday January 2nd 2024 7pm Zoom",
  },
  {
    id: "14",
    label: "Dry Land#4 Thursday January 4th 2024 7pm Zoom",
  },
  {
    id: "15",
    label: "On Snow Clinic#4 Saturday January 6th 2024 930am Summit Central",
  },
  {
    id: "16",
    label: "On Snow Clinic#4 Sunday January 7th 2024 930am Summit Central",
  },
] as const;

interface AssistantSignupFormProps {
  onSubmit: (data: AssistantFormValues) => void;
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
  NAME_FIRST: z.string(),
  NAME_LAST: z.string(),
  HOME_TEL: z.string(),
  C_TEL: z.string(),
  BRTHD: z.date(),
  AGE: z.number().optional(),
  E_mail_main: z.string(),
  ADDRESS: z.string(),
  CITY: z.string(),
  STATE: z.string(),
  ZIP: z.string(),
  STATUS: z.string().optional(),
  COMMENTS: z.string().optional(),
  PSIA: z.string().optional(),
  prevYear: z.string().optional(),
  dateReg: z.string().optional(),
  dateConfirmed: z.string().optional(),
  emailCommunication: z.boolean().optional(),
  InstructorType: z.string().optional(),
  AASI: z.string().optional(),
  testScore: z.string().optional(),
  ParentAuth: z.boolean().optional(),
  OverNightLodge: z.boolean().optional(),
  ageRequestByStaff: z.array(z.string()).optional(),
  clinics: z.array(z.string()).optional(),
  clinicInstructor: z.boolean().optional(),
  Supervisor: z.boolean().optional(),
  skiLevel: z.string().optional(),
  boardLevel: z.string().optional(),
  skiMinAge: z.string().optional(),
  skiMaxAge: z.string().optional(),
  boardMinAge: z.string().optional(),
  boardMaxAge: z.string().optional(),
  married: z.boolean().optional(),
  resume: z.string().optional(),
  spouseName: z.string().optional(),
  noteToInstructor: z.string().optional(),
  instructorCom: z.string().optional(),
  priority: z.string().optional(),
  dateAssigned: z.string().optional(),
  assignmentConfirmed: z.string().optional(),
  classSignedUp: z.string().optional(),
  classAssigned: z.string().optional(),
  permSub: z.boolean().optional(),
  back2Back: z.boolean().optional(),
  classPerWeek: z.string().optional(),
  updateAt: z.date(),
  dateTimes: z.string().optional(),
  classTimeIds: z.array(z.number()).optional(),
  employeeNumber: z.string().optional(),
  payRate: z.string().optional(),
  deductions: z.string().optional(),
  payCheckNo: z.string().optional(),
  payCheckDate: z.string().optional(),
  payAdvance: z.string().optional(),
  payComment: z.string().optional(),
  ssn: z.string().optional(),
  payType: z.string().optional(),
  dateFeePaid: z.string().optional(),
  disclosureForm: z.boolean().optional(),
  i9Form: z.boolean().optional(),
  w4Recieved: z.boolean().optional(),
  WSPRecieved: z.boolean().optional(),
  testRecieved: z.boolean().optional(),
  idRecieved: z.boolean().optional(),
  schoolPermission: z.boolean().optional(),
  WSPDate: z.string().optional(),
});

type AssistantFormValues = z.infer<typeof formSchema>;

const AssistantSignupForm: React.FC<AssistantSignupFormProps> = ({
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
  const [open, setOpen] = useState(false);
  const [instructorClassTimes, setInstructorClassTimes] = useState<
    InstructorClassTime[]
  >([]);
  const [classTimes, setClassTimes] = useState<ClassTime[]>([]);

  useEffect(() => {
    if (sessionId && orderId) {
      // Store session_id and orderId in localStorage or state if needed
      localStorage.setItem("session_id", sessionId);
      localStorage.setItem("orderId", orderId);
    }
  }, [sessionId, orderId]);

  const form = useForm<AssistantFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NAME_FIRST: "",
      NAME_LAST: "",
      HOME_TEL: "",
      C_TEL: "",
      BRTHD: new Date(),
      E_mail_main: "",
      ADDRESS: "",
      CITY: "",
      STATE: "",
      ZIP: "",
      STATUS: "",
      COMMENTS: "",
      prevYear: "",
      dateReg: "",
      dateConfirmed: "",
      emailCommunication: false,
      InstructorType: "",
      PSIA: "",
      AGE: 0,
      AASI: "",
      testScore: "",
      ParentAuth: false,
      OverNightLodge: false,
      ageRequestByStaff: [],
      clinics: [],
      clinicInstructor: false,
      Supervisor: false,
      skiLevel: "",
      boardLevel: "",
      skiMinAge: "",
      skiMaxAge: "",
      boardMaxAge: "",
      boardMinAge: "",
      married: false,
      spouseName: "",
      resume: "",
      instructorCom: "",
      noteToInstructor: "",
      priority: "",
      permSub: false,
      back2Back: false,
      dateAssigned: "",
      assignmentConfirmed: "",
      classSignedUp: "0",
      classAssigned: "0",
      classPerWeek: "0",
      updateAt: new Date(),
      classTimeIds: [],
      employeeNumber: "0",
      payRate: "0",
      deductions: "0",
      payCheckNo: "0",
      payCheckDate: "0",
      payAdvance: "0",
      payComment: "0",
      ssn: "",
      payType: "",
      dateFeePaid: "",
      disclosureForm: false,
      i9Form: false,
      w4Recieved: false,
      WSPRecieved: false,
      testRecieved: false,
      idRecieved: false,
      schoolPermission: false,
      WSPDate: "", // Set the program code here
    },
  });

  useEffect(() => {
    // Fetch available class times from your backend
    const fetchClassTimes = async () => {
      try {
        const response = await fetch("process.env.NEXT_PUBLIC_API/Classtimes");
        const data = await response.json();
        setClassTimes(data); // Assuming data is an array of class times
      } catch (error) {
        console.error("Error fetching class times:", error);
      }
    };

    fetchClassTimes();
  }, []);

  const handleCheckboxChange = (classTimeId: number, checked: boolean) => {
    if (checked) {
      setInstructorClassTimes((prev) => [
        ...prev,
        { instructorId: "some-id", classTimeId },
      ]);
    } else {
      setInstructorClassTimes((prev) =>
        prev.filter((ct) => ct.classTimeId !== classTimeId)
      );
    }
  };

  const handleBirthdateChange = (value: Date) => {
    if (value) {
      setSelectedDate(value);
      const newAge = calculateAge(value);
      setAge(newAge);
      form.setValue("AGE", newAge);
      form.setValue("BRTHD", value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    const parsedDate = parse(dateValue, "MM-dd-yyyy", new Date());

    if (parsedDate && isValid(parsedDate)) {
      const age = differenceInYears(new Date("2025-01-01"), parsedDate);
      form.setValue("BRTHD", parsedDate);
      form.setValue("AGE", age); // If you want to set age as well
    } else {
      // Option 2: Do nothing if the date is invalid, or show an error message
      console.error("Invalid date entered.");
      // Optionally clear or reset the invalid date
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Instructor Signup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Top Section: Three Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="NAME_FIRST"
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
                  name="NAME_LAST"
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
                  name="ADDRESS"
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
                  name="CITY"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="City"
                          {...field}
                        />
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
                        <Input
                          disabled={loading}
                          placeholder="State"
                          {...field}
                        />
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
                        <Input
                          disabled={loading}
                          placeholder="ZIP"
                          {...field}
                        />
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
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Phone"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="E_mail_main"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Email"
                          {...field}
                        />
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
                  name="InstructorType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value} // Use value instead of defaultValue
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Instructor Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Ski assistant">
                            Ski assistant
                          </SelectItem>
                          <SelectItem value="Board assistant">
                            Board assistant
                          </SelectItem>
                          <SelectItem value="Ski and Board Assistant">
                            Ski and Board Assistant
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bottom Section: Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Instructor Class Scheduling */}
                <Card className="p-4">
                  <CardHeader>
                    <CardTitle>Instructor Class Scheduling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="classTimeIds"
                      render={({ field }) => {
                        const selectedClassTimes = field.value || [];
                        return (
                          <FormItem className="flex flex-col space-y-4">
                            {classes.map((classTime) => (
                              <div
                                key={classTime.id}
                                className="flex flex-row items-start space-x-3"
                              >
                                <Checkbox
                                  id={`class-time-${classTime.id}`}
                                  checked={selectedClassTimes.includes(
                                    classTime.id
                                  )}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([
                                        ...selectedClassTimes,
                                        classTime.id,
                                      ]);
                                    } else {
                                      field.onChange(
                                        selectedClassTimes.filter(
                                          (id) => id !== classTime.id
                                        )
                                      );
                                    }
                                  }}
                                />
                                <FormLabel className="font-normal">
                                  {classTime.label}
                                </FormLabel>
                              </div>
                            ))}
                          </FormItem>
                        );
                      }}
                    />
                  </CardContent>
                </Card>

                {/* Clinics */}
                <Card className="p-4">
                  <CardHeader>
                    <CardTitle>Clinics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="clinics"
                      render={() => (
                        <FormItem className="flex flex-col space-y-4">
                          {clinics.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="clinics"
                              render={({ field }) => {
                                const selectedClinics = field.value || [];
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={selectedClinics.includes(
                                          item.id
                                        )}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([
                                              ...selectedClinics,
                                              item.id,
                                            ]);
                                          } else {
                                            field.onChange(
                                              selectedClinics.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                          }
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end mt-8">
                <Button disabled={loading} className="ml-auto" type="submit">
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

export { AssistantSignupForm };
export type { AssistantFormValues };
