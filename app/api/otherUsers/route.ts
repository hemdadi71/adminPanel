import getSession from '@/app/actions/getSession'
import dbConnect from '@/app/libs/dbConenct'
import User from '@/app/model/User'

import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    await dbConnect()
    const session = await getSession()
    const users = await User.find({})
    const otherUsers = users.filter(item => item.id !== session?.user?.id)
    if (!otherUsers.length) {
      return new NextResponse('No users found', {
        status: 404,
      })
    }

    return new NextResponse(JSON.stringify(otherUsers), {
      status: 200,
    })
  } catch (error) {
    console.error(error, 'GET_USERS_ERROR')
    return new NextResponse(JSON.stringify({ error: 'Internal Error' }), {
      status: 500,
    })
  }
}
