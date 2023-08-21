import getSession from '@/app/actions/getSession'
import dbConnect from '@/app/libs/dbConenct'
import User from '@/app/model/User'

import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    await dbConnect()
    const session = await getSession()
    const user = await User.find({})
    if (!user) {
      return new NextResponse('No users found', {
        status: 404,
      })
    }
    const profiles = user.filter((item: any) => item?.key === session?.user?.id)
    return new NextResponse(JSON.stringify(profiles), {
      status: 200,
    })
  } catch (error) {
    console.error(error, 'GET_USERS_ERROR')
    return new NextResponse(JSON.stringify({ error: 'Internal Error' }), {
      status: 500,
    })
  }
}
