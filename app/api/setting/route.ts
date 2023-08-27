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
    const { id, email, name, password, image, role } = body

    if (!id || !email || !name || !password || !role) {
      return new NextResponse('Missing info', { status: 400 })
    }
    const userToUpdate = await User.findById(id)

    if (!userToUpdate) {
      return new NextResponse('User not found', { status: 404 })
    }

    // Check if the email is being updated and it's different from the current email
    if (email !== userToUpdate.email) {
      const existingUser = await User.findOne({ email })

      if (existingUser) {
        return new NextResponse('User with this email already exists', {
          status: 400,
        })
      }
    }
    // Check if the name is being updated and it's different from the current name
    if (name !== userToUpdate.name) {
      const existingUserByName = await User.findOne({ name })

      if (existingUserByName) {
        return new NextResponse('User with this name already exists', {
          status: 400,
        })
      }
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

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    })

    if (!updatedUser) {
      return new NextResponse('User not found', { status: 404 })
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error, 'UPDATE_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
