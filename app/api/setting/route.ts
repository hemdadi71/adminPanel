import dbConnect from '@/app/libs/dbConenct'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import User from '@/app/model/User'
export async function PUT(request: Request) {
  await dbConnect()
  try {
    const body = await request.json()
    const { id, email, name, password, image, role } = body

    if (!id || !email || !name || !password || !role) {
      return new NextResponse('Missing info', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const updateFields = {
      name,
      email,
      password,
      image,
      role,
      hashedPassword,
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    )

    if (!updatedUser) {
      return new NextResponse('User not found', { status: 404 })
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error, 'UPDATE_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
