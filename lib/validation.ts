import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address is required'),
  educationLevel: z.string().optional(),
  school: z.string().optional(),
  course: z.string().optional(),
  graduationYear: z.string().optional(),
  experience: z.number().optional(),
  currentRole: z.string().optional(),
  company: z.string().optional(),
  bio: z.string().optional(),
});

export const createJobSchema = z.object({
  title: z.string().min(5, 'Job title must be at least 5 characters'),
  company: z.string().min(2, 'Company name is required'),
  province: z.string().min(1, 'Province is required'),
  salary: z.string().min(1, 'Salary is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  requirements: z.array(z.string()).min(1, 'At least one requirement is needed'),
  benefits: z.array(z.string()).optional(),
  deadline: z.string().min(1, 'Deadline is required'),
});

export const paymentSchema = z.object({
  phoneNumber: z.string().regex(/^(\+254|0)[0-9]{9}$/, 'Invalid Kenyan phone number'),
  amount: z.number().min(100, 'Minimum amount is KES 100'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type CreateJobInput = z.infer<typeof createJobSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
