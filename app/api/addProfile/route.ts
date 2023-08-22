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
    const { email, name, password, image } = body

    if (!email || !name || !password) {
      return new NextResponse('Missing info', { status: 400 })
    }
    const users = await User.find({})
    const existUser = users.find(
      (item: any) =>
        item.email === session?.user?.email || item.name === session?.user?.name
    )
    if (Object.values(existUser).length === 0) {
      return new NextResponse('User with this data is alreay exist', {
        status: 400,
      })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = {
      name,
      email,
      password,
      image,
      role: 'user',
      key: session?.user?.id,
      hashedPassword,
    }

    const updatedUser = await User.create(newUser)

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error, 'UPDATE_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
