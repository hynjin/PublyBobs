import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export function GuestDropdown() {
    const { data: session } = useSession();

    return (
        <Menu as="div" className="w-44 relative text-left">
            <Menu.Button>
                <div className="w-44 p-3 flex items-center border text-xs">
                    <div className="flex-1 text-left">
                        <p>
                            퍼블리 팀원이라면,
                            <br />
                            저녁 먹고 일하세요!
                        </p>
                    </div>
                    <div className="triangle-down" />
                </div>
            </Menu.Button>
            <Transition>
                {/* TODO: 로그인 페이지에서는 회원가입, 회원가입 페이지에서는 로그인 (그냥 둘 다 넣어버릴까) */}
                <Menu.Items className="absolute right-0 mt-2 origin-top-right w-44 bg-white border overflow-hidden">
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`${
                                    active && 'bg-gray-50'
                                } block p-3 text-sm`}
                                onClick={() =>
                                    session ? signOut() : signIn('google')
                                }
                            >
                                {session ? '로그아웃' : '로그인'}
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${
                                    active && 'bg-gray-50'
                                } block p-3 text-sm`}
                                href="/join"
                            >
                                회원가입
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
