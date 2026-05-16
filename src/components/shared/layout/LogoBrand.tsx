import logoImage from "../../../../public/Logo.png";
import Image from "next/image";

export default function LogoBrand() {
    return (
        <div className="flex justify-center items-center">
            <Image
                src={logoImage}
                className="dark:invert"
                alt="logo"
                width={48}
                height={48}
            />
            <span className="text-xl font-bold">SkillBridge</span>
        </div>
    );
}
