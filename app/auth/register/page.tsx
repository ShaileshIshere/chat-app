// "use client"
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

import { RegisterForm } from "@/components/auth/register-form";

// export default function() {
//     const router = useRouter();

//     return <div>
//         <button onClick={async () => {
//             await signIn("google");
//         }}>Login with google</button>

//         <br />
//         <button onClick={async () => {
//             await signIn("github");
//         }}>Login with Github</button>
//         <br />
//         <button onClick={async () => {
//             const res = await signIn("credentials", {
//                 username: "",
//                 password: "",
//                 redirect: false,
//             });
//             console.log(res);
//             router.push("/")
//         }}>Login with email</button>

//     </div>
// }

const RegisterPage = () => {
    return <RegisterForm />;
};

export default RegisterPage;
