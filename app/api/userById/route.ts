import getSession from '@/app/actions/getSession'
import dbConnect from '@/app/libs/dbConenct'
import User from '@/app/model/User'

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    await dbConnect()
    const body = await request.json()
    const { id } = body
    const user = await User.findById(id)
    if (!user) {
      return new NextResponse('No users found', {
        status: 404,
      })
    }

    return new NextResponse(JSON.stringify(user), {
      status: 200,
    })
  } catch (error) {
    console.error(error, 'GET_USERS_ERROR')
    return new NextResponse(JSON.stringify({ error: 'Internal Error' }), {
      status: 500,
    })
  }
}
