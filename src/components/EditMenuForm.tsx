import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as DateHelper from '../helper/DateHelper';

export default function EditMenuForm() {
    const SingleForm = () => {
        return(
            <div>
                <span>식당/메뉴 입력폼</span>
            </div>
        );
    };

    return (
        <div>
            <div className="px-3 py-6 flex items-center">
                <div // TODO: rolling text
                    className="flex-1 text-sm"
                >
                    <p>Tip: 설정에서 주문한 적 있는 식당/메뉴와 주문자 목록을 관리할 수 있어요.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="btn btn-ghost"
                        // onClick={ 식당/메뉴 입력폼 추가 }
                    >
                        식당 추가
                    </button>
                    <button
                        type="button"
                        className="btn"
                        // onClick={ 데이터 저장. 저장하지 않고 다른 이전/다음/설정/GNB메뉴 등을 누르면 저장하라는 alert을 노출 }
                    >
                        저장
                    </button>
                </div>
            </div>
            <div className="px-3 grid grid-cols-3 gap-6">
                {SingleForm()}
            </div>
        </div>
    );
}
