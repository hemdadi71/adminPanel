import dbConnect from '@/app/libs/dbConenct'
import User from '@/app/model/User'
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
  await dbConnect()
  try {
    const body = await request.json()
    const { id } = body
    if (!id) {
      return new NextResponse('Missing user ID', {
        status: 400,
      })
    }

    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return new NextResponse('User not found', {
        status: 404,
      })
    }

    return new NextResponse(JSON.stringify(user), {
      status: 200,
    })
  } catch (error) {
    console.error(error, 'DELETE_USER_ERROR')
    return new NextResponse(JSON.stringify({ error: 'Internal Error' }), {
      status: 500,
    })
  }
}
