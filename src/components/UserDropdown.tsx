import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'

export function UserDropdown() {
    return (
        <Menu as="div" className="w-44 relative text-left">
            <Menu.Button>
                <div className="w-44 p-3 flex items-center border text-xs">
                    <div className="flex-1 text-left">
                        <p>이름</p>
                        <p>email@publy.co</p>
                    </div>
                    <div className="triangle-down" />
                </div>
            </Menu.Button>
            <Transition>
                <Menu.Items className="absolute right-0 mt-2 origin-top-right w-44 bg-white border overflow-hidden">
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${active && 'bg-gray-50'} block p-3 text-sm`}
                                href="/editor"
                            >
                                식단 등록하기
                                {/* @hyunjin TODO: 주문자로 등록된 사람들에게만 보임 or 주문자로 등록되지 않은 사람들에게는 비활성화 처리  */}
                                {/* @hyunjin TODO: index 화면에서만 보임 */}
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${active && 'bg-gray-50'} block p-3 text-sm`}
                                href="/"
                            >
                                퍼블리 밥스 보러가기
                                {/* @hyunjin TODO: editor 화면에서만 보임 */}
                                {/* @hyunjin TODO: editor 화면에서 저장하지 않고 누를 경우 '저장하지 않은 내용은 사라진다'는 alert 노출 */}
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${active && 'bg-gray-50'} block p-3 text-sm`}
                                href="/login"
                            >
                                로그아웃
                                {/* @hyunjin TODO: 로그아웃 + login 화면으로 이동 */}
                                {/* @hyunjin TODO: editor 화면에서 저장하지 않고 누를 경우 '저장하지 않은 내용은 사라진다'는 alert 노출 */}
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}