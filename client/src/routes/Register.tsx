import Layout from '../layouts/index'
import { trpc } from '../utils/trpc'
export default function Register() {
    const registerUserMutation = trpc.user.register.useMutation()

    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await registerUserMutation.mutateAsync({
            firstName: e.currentTarget.firstName?.value,
            lastName: e.currentTarget.lastName?.value,
            email: e.currentTarget.email?.value,
            password: e.currentTarget.password?.value,
        })
    }

    return (
        <Layout>
            <form onSubmit={registerUser} className="flex flex-col">
                <input type="text" placeholder="firstName" name="firstName" />
                <input type="text" placeholder="lastName" name="lastName" />
                <input type="email" placeholder="email" name="email" />
                <input type="password" placeholder="password" name="password" />
                <button type="submit">Register</button>
            </form>
        </Layout>
    )
}
