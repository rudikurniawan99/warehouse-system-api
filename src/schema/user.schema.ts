import { object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'nama tidak boleh kosong'
    }),
    email: string({
      required_error: 'email tidak valid'
    }).email('email tidak boleh kosong'),
    password: string({
      required_error: 'password tidak boleh kosong'
    }).min(8, 'minimal terdiri dari 8 karakter'),
    passwordConfirmation: string({
      required_error: 'konfirmasi password tidak boleh kosong'
    }).min(8, 'minimal terdiri dari 8 karakter')
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'password dan konfirmasi password tidak sesuai',
    path: ['passwordConfirmation']
  })
})

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'email tidak valid'
    }).email('email tidak boleh kosong'),
    password: string({
      required_error: 'password tidak boleh kosong'
    }).min(8, 'minimal terdiri dari 8 karakter')
  })
})