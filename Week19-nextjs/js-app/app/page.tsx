import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div className="text-lg w-screen h-screen flex items-center justify-center">
    
    <div>
    Todo application
      <br />
      <Link href="/signin">Signin to Todo App</Link>
      <br />
      <Link href="/signup">Signup to Todo App</Link>
    </div>

   </div>
  );
}
