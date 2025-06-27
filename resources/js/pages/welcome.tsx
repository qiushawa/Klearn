import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import { FaPython, FaJava, FaRust, FaEnvelope, FaDiscord, FaInstagram } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiCplusplus, SiPhp } from 'react-icons/si';
import { Avatar } from "flowbite-react";

interface PageProps {
    student_name: string,
    [key: string]: unknown
}

export default function Welcome() {
    const { props } = usePage<PageProps>()
    const languages = [
        { id: 1, name: 'Python', icon: <FaPython className="text-5xl text-blue-600 mb-4 mx-auto" size={80} />, description: '(3.8.1)' },
        { id: 2, name: 'JavaScript', icon: <IoLogoJavascript className="text-5xl text-yellow-500 mb-4 mx-auto" size={80} />, description: '(Node.js 12.14.0)' },
        { id: 3, name: 'C/C++', icon: <SiCplusplus className="text-5xl text-green-600 mb-4 mx-auto" size={80} />, description: '(GCC 9.2.0)' },
        { id: 4, name: 'Java', icon: <FaJava className="text-5xl text-red-600 mb-4 mx-auto" size={80} />, description: '(OpenJDK 13.0.1)' },
        { id: 5, name: 'Rust', icon: <FaRust className="text-5xl text-gray-500 mb-4 mx-auto" size={80} />, description: '(1.40.0)' },
        { id: 6, name: 'PHP', icon: <SiPhp className="text-5xl mb-4 mx-auto" style={{ color: "#4f5b93" }} size={80} />, description: '(7.4.1)' },
    ];
    const author = {
        name: '邱聖傑',
        role: 'Creator & Developer',
        bio: '就讀虎尾科技大學資訊工程科四年級，正在學習網頁設計與全端開發。現在負責設計與維護資工系教室借用系統。',
    };
    const infoCard = {
        title: '關於此網站',
        content: <p className="text-gray-600 leading-relaxed">
            這個網站是我暑假時抽空設計的，原本只是為了練習Laravel和React的全端開發技能。<br />
            <br />
            啊什麼？你說這個網站比你阿罵棉被上花紋的設計還糟糕？🗣️ 🔥 🔥 🔥<br />
            我只能說，你說的對！敝人的網頁設計只有80分，如果你網頁設計很厲害，求你來幫幫我😭<br />
        </p>
    };

    const student_name = props.student_name
    return (
        <>
            <Head title="KLearn - 程式練習平台" />
            <div className="min-h-screen bg-gray-50 font-sans antialiased">
                {/* Navigation Bar */}
                <Navbar
                    items={[
                        { href: '#about', label: '關於我們', isHighlight: false },
                        { href: '#languages', label: '支援語言', isHighlight: false },
                        { href: '#manual', label: '使用手冊', isHighlight: false },
                        student_name
                            ? { href: route("auth.logout"), label: '登出', isHighlight: true }
                            : { href: route("login.page"), label: '登入', isHighlight: true },
                    ]}
                    brandName="KLearn"
                />
                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 text-white py-32 md:py-40 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTI4MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTY0MCA3MEwzMjAgMTQwTDAgNzBMMzIwIDB2NzB6bTAgMEwzMjAgNzB2NzBaTTY0MCA3MEwxMjgwIDB2MjAwWiIvPjwvZz48L3N2Zz4=')] bg-repeat-x bg-bottom opacity-30"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                            KLearn 程式練習平台
                        </h1>
                        <p className="text-xl md:text- agonizing md:text-2xl text-gray-100 mb-10 max-w-4xl mx-auto leading-relaxed">
                            專為晚自習設計的程式練習工具，助老師輕鬆出題，學生高效完成作業！
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            {student_name && (
                                <a
                                    href="/courses"
                                    className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 hover:shadow-lg"
                                >
                                    我的課程
                                </a>
                            )}
                            <a
                                href="#languages"
                                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-700"
                            >
                                查看支援語言
                            </a>
                        </div>
                    </div>
                </section>

                {/* About Us Section */}
                <section id="about" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
                            關於我們
                        </h2> */}
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Author Card */}
                            <div className="flex-1 lg:flex-none lg:w-2/5 bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex flex-col items-center">
                                    <Avatar img="/images/qiushawa_avatar.jpg" alt="avatar of Jese" rounded size="xl" className="mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-800">{author.name}</h3>
                                    <p className="text-blue-600 font-medium mb-3">{author.role}</p>
                                    <p className="text-gray-600 text-sm text-center w-[75%]">{author.bio}</p>
                                    <div className="flex gap-4 mt-6">
                                        <a href="mailto:example@email.com" className="text-gray-600 hover:text-blue-600">
                                            <FaEnvelope className="text-2xl" />
                                        </a>
                                        <a href="https://discord.gg/example" className="text-gray-600 hover:text-blue-600">
                                            <FaDiscord className="text-2xl" />
                                        </a>
                                        <a href="https://instagram.com/example" className="text-gray-600 hover:text-blue-600">
                                            <FaInstagram className="text-2xl" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* Info Card */}
                            <div className="flex-1 lg:flex-none lg:w-3/5 bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">{infoCard.title}</h3>
                                {infoCard.content}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Supported Languages Section */}
                <section id="languages" className="py-20 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-10">
                            支援的程式語言
                        </h2>
                        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                            老師可選擇以下語言為晚自習出練習作業，學生可練習指派題目或歷史題目（不受語言限制）。
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {languages.map((lang) => (
                                <div
                                    key={lang.id}
                                    className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-300"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        {lang.icon}
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{lang.name}</h3>
                                        <p className="text-gray-500 text-sm mb-4">{lang.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <a
                                href="/assignments/history"
                                className="inline-block bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-blue-800 transition-all duration-300"
                            >
                                練習歷史題目
                            </a>
                        </div>
                    </div>
                </section>

                {/* Manual Section (Placeholder) */}
                <section id="manual" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
                            使用手冊
                        </h2>
                        <p className="text-gray-600 text-center">內容即將推出...</p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8 text-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-sm text-gray-300">
                            © 2025 KLearn. 程式練習平台，專為晚自習課程設計。聯繫我們：
                            <a href="mailto:support@klearn.com" className="text-blue-400 hover:underline ml-1">
                                support@klearn.com
                            </a>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
