import dbConnect from '@/app/libs/dbConenct'
import User from '@/app/model/User'
import bcrypt from 'bcrypt'

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  await dbConnect()
  try {
    const body = await request.json()
    const { email, name, password } = body

    if (!email || !name || !password) {
      return new NextResponse('Missing info', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await User.create({
      name,
      email,
      hashedPassword,
      password,
      role: 'user',
    })
    return NextResponse.json(newUser)
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
