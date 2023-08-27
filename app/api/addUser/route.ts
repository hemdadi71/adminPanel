import dbConnect from '@/app/libs/dbConenct'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import User from '@/app/model/User'
import getSession from '@/app/actions/getSession'

export async function POST(request: Request) {
  await dbConnect()
  try {
    const session = await getSession()
    const body = await request.json()
    const { email, name, password, image, role } = body

    if (!email || !name || !password || !role) {
      return new NextResponse('Missing info', { status: 400 })
    }
    // Check if the email already exists in the database
    const existingUserByEmail = await User.findOne({ email })

    if (existingUserByEmail) {
      return new NextResponse('User with this email already exists', {
        status: 400,
      })
    }

    // Check if the name already exists in the database
    const existingUserByName = await User.findOne({ name })

    if (existingUserByName) {
      return new NextResponse('User with this name already exists', {
        status: 400,
      })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = {
      name,
      email,
      password,
      image,
      role,
      hashedPassword,
    }

    const updatedUser = await User.create(newUser)

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error, 'UPDATE_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
