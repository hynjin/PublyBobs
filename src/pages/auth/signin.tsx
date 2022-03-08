import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    useLayoutEffect,
} from 'react';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import type { NextApiRequest, NextApiResponse } from 'next';
import { GuestDropdown } from '../../components/GuestDropdown';
import { signIn } from 'next-auth/react';

export default function SignIn() {
    return (
        <div
            className={
                `${styles.container}
                flex
                flex-col
                divide-y
                divide-double` // ERROR! double 스타일 적용
            }
        >
            <div className="divide-y">
                <div className="px-6 py-8 flex justify-between items-center">
                    <div className="w-44 p-3 border text-xs">
                        <p>
                            퍼블리 저녁식사 신청 시스템
                            <br />
                            퍼블리 밥스 오픈베타
                        </p>
                    </div>
                    <h1>Publy Bobs</h1>
                    <GuestDropdown />
                </div>
                <div className="p-3 text-center">
                    <span>저녁 걱정 덜어주기 제도를 더 알고 싶다면?</span>
                    <a
                        className="pl-2 text-primary underline"
                        target="_blank"
                        href="https://publyco.atlassian.net/wiki/spaces/all/pages/2852257793/-"
                    >
                        자세히보기
                    </a>
                </div>
            </div>
            <div className="py-[80px] flex-1 flex flex-col items-center">
                <button onClick={() => signIn('google')}>
                    Sign in with google
                </button>

                <div className="w-full max-w-xs">
                    <form>
                        <label>이메일</label>
                        <div className="input flex">
                            <input
                                className="flex-1"
                                type="text"
                                placeholder={'email'}
                            />
                            <span>@publy.co</span>
                        </div>
                        {/* error 상황에 등장 */}
                        <p className="description error">
                            * flex에 등록되지 않은 이메일이에요.
                        </p>
                    </form>
                    <form>
                        <label>비밀번호</label>
                        <input
                            className="input"
                            type="password"
                            placeholder={'●●●●●●'}
                        />
                        {/* error 상황에 등장 */}
                        <p className="description error">
                            * 비밀번호는 숫자, 영문 포함 6자 이상이에요.
                        </p>
                    </form>
                    <form>
                        <p className="description">
                            * 직접 로그아웃하기 전까지 로그인 상태를 유지할게요!
                        </p>
                    </form>
                </div>
                <button type="submit" className="mx-auto btn">
                    로그인
                </button>
            </div>
        </div>
    );
}
