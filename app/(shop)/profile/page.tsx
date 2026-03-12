import { auth } from '@/auth'

const page = async () => {

    const session = await auth()
    console.log(session?.user.rol)
    return (
        <div>
            <h1>Profile</h1>
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
        </div>
    )
}

export default page