import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as DateHelper from '../helper/DateHelper';

type AddChefProps = {
    date: DateHelper.ConfigType;
    weekNumber: number;
};

export default function AddChefForm(props: AddChefProps): JSX.Element {
    const { date, weekNumber } = props;
    const daysOfWeek = DateHelper.getWeekDayList().slice(1, 6);
    const [chefs, setChefs] = useState<any[]>([]);

    const {
        register,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({});

    const getChefs = useCallback(async () => {
        const query = `?weekNumber=${weekNumber}`;
        const resultChefs = await fetch(`/api/chefs` + query, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => res.json());
        setChefs(resultChefs);
    }, [weekNumber]);

    useEffect(() => {
        getChefs();
    }, [weekNumber]);

    useEffect(() => {
        _.map(daysOfWeek, (day, i) => {
            setValue(`addChef.${i}`, chefs[i]?.chef);
        });
    }, [chefs]);

    const onClickAddChef = useCallback(
        async (data: any) => {
            const { addChef } = data;
            await fetch('/api/chefs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date,
                    chefs: addChef,
                    weekNumber: weekNumber,
                }),
            });
        },
        [date]
    );

    return (
        <div className="p-3">
            {/* section title */}
            <div className="mb-6">
                <div className="relative h-6 mb-1">
                    <div className="
                        absolute -top-2 -left-4 -rotate-12
                        w-8 h-4 rounded-[32px/16px] bg-primary
                        flex justify-center items-center
                    ">
                        <span className="text-[10px] text-white font-bold leading-none">
                            NOT
                        </span>
                    </div>
                    <h3 className="absolute">Chefs of The Week</h3>
                </div>
                <p className="text-sm text-gray-700">
                    일주일의 주문자를 등록해주세요.
                </p>
            </div>
            <form onSubmit={handleSubmit(onClickAddChef)}>
                {_.map(daysOfWeek, (item, index) => {
                    return (
                        // TODO: combobox로 바꾸기
                        <div key={index} className="input mb-2">
                            <input
                                id={`add-chef-${index}`}
                                type="text"
                                placeholder={item}
                                {...register(`addChef.${index}`)}
                            />
                        </div>
                    );
                })}
            </form>
            <div className="flex justify-center gap-2">
                {chefs.length > 0 &&
                    <button
                        type="button"
                        className="btn btn-ghost"
                    >
                        주문자 변경
                    </button>
                }
                {chefs.length === 0 &&
                    <button
                        type="submit"
                        className="btn"
                        disabled={isSubmitting}
                    >
                        주문자 등록
                    </button>
                }
                {/* @hyunjin TODO: 주문자 변경 버튼을 누르면 [취소/등록] 버튼으로 바뀌도록 */}
                <button
                    type="button"
                    className="btn btn-ghost"
                    disabled={isSubmitting}
                >
                    취소
                </button>
                <button
                    type="submit"
                    className="btn"
                    disabled={isSubmitting}
                >
                    등록
                </button>
            </div>
        </div>
    );
}
