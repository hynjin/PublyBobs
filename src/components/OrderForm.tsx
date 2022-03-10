import _ from 'lodash';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import * as DateHelper from '../helper/DateHelper';
import AddMenuForm from './AddMenuForm';
import { useSession } from 'next-auth/react';
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/solid';
import { fetcher, postFetcher } from '../helper/Helper';
import useSWR from 'swr';

type AddOrderProps = {
    selectedDay: string;
    weekNumber: number;
};

// for RadioGroup example
const plans = [
    {
        name: 'Startup',
        ram: '12GB',
        cpus: '6 CPUs',
        disk: '160 GB SSD disk',
    },
    {
        name: 'Business',
        ram: '16GB',
        cpus: '8 CPUs',
        disk: '512 GB SSD disk',
    },
    {
        name: 'Enterprise',
        ram: '32GB',
        cpus: '12 CPUs',
        disk: '1024 GB SSD disk',
    },
]

export default function OrderForm(props: AddOrderProps): JSX.Element {
    // for RadioGroup example
    const [selected, setSelected] = useState(plans[0])

    const { data: session } = useSession();
    const user = session?.user;

    const { selectedDay, weekNumber } = props;
    const { data } = useSWR(
        `/api/edit-orders?weekNumber=${weekNumber}`,
        fetcher
    );
    const [weekMenus, setWeekMenus] = useState<_.Dictionary<OrderType>>({});
    const [todayMenu, setTodayMenu] = useState<OrderType>();
    const dayNumber = DateHelper.getDayOfWeek(selectedDay);

    const handlers = useForm();
    const {
        handleSubmit,
        getFieldState,
        register,
        setValue,
        formState: { errors },
    } = handlers;

    useEffect(() => {
        const orders = _.keyBy(data, 'date.day_of_week');
        setWeekMenus(orders);
    }, [data]);

    useEffect(() => {
        const today = weekMenus[dayNumber];
        setTodayMenu(today);
    }, [selectedDay, dayNumber, weekMenus]);

    const onClickOrder = useCallback(
        async (data: any) => {
            const order = _.split(data?.order, '-');
            const body = {
                selectedDay,
                order,
                userId: user?.userId,
                option: data?.option,
            };
            await postFetcher('/api/orders', body);
        },
        [selectedDay, user]
    );
    return (
        <FormProvider {...handlers}>
            <div className="px-3 py-6 flex items-center">
                <div // TODO: rolling text
                    className="flex-1 text-sm"
                >
                    <p><span className="font-bold">Tip:</span> 오후 5시 30분에 주문이 마감됩니다!</p>
                </div>
                {/* 주문(변경) 중 */}
                <button
                    type="submit"
                    className="btn"
                    // disabled={ 선택된 메뉴가 없으면 opacity 0.4 }
                    onClick={handleSubmit(onClickOrder)}
                >
                    주문하기
                </button>
                {/* 주문 완료 */}
                {/* 
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="btn btn-ghost btn-red"
                        // onClick={ }
                    >
                        주문 취소
                    </button>
                    <button
                        type="button"
                        className="btn btn-ghost btn-gray"
                        // onClick={ }
                    >
                        변경
                    </button>
                </div>
                */}
            </div>
            <div className="py-3 gap-6">
                {_.map(todayMenu?.orders, (orders, index) => {
                    return (
                        <div key={`restaurant-list-${index}`} className="mb-3">
                            <div className="p-3">
                                <p className="text-xl mb-1">{orders?.restaurant.name}</p>
                                <p className="text-xs text-gray-700">
                                    {/* TODO: 식당 설명 있는 경우에는 식당 설명이 나옵니다 */}
                                    QR코드를 스캔하면 배달의민족 앱에서 확인할 수 있어요.
                                </p>
                            </div>
                            <div className="flex">
                                <div className="flex-1">
                                    {/* 주문(변경) 중일 때 */}
                                    <RadioGroup value={selected} onChange={setSelected}>
                                        {/* TODO: Label 필요없으면 삭제 */}
                                        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                        {plans.map((plan) => (
                                            <RadioGroup.Option
                                                key={plan.name}
                                                value={plan}
                                                className="relative p-3 cursor-pointer focus:outline-none"
                                            >
                                                {({ checked }) => (
                                                <>
                                                    <div className="flex gap-3">
                                                        <div
                                                            className={`flex-none w-6 h-6 overflow-auto relative border rounded-full ${
                                                                checked ? 'border-primary' : 'border-gray-700'
                                                            }`}
                                                        >
                                                            {checked && (
                                                                <CheckCircleIcon className="text-primary absolute -inset-1" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="mb-1 flex justify-between">
                                                                <RadioGroup.Label
                                                                    as="p"
                                                                    className="text-base text-gray-900"
                                                                >
                                                                    메뉴 이름
                                                                </RadioGroup.Label>
                                                                <button
                                                                    type="button"
                                                                    className="btn-text text-xs text-gray-700"
                                                                >
                                                                    0명
                                                                </button>
                                                            </div>
                                                            {/* optional */}
                                                            <RadioGroup.Description as="p" className="description">
                                                                메뉴에 대한 설명
                                                            </RadioGroup.Description>
                                                            <div className="mt-2 h-2 w-full bg-gray-100 relative">
                                                                {/* TODO: 아래 <div> width = {해당 메뉴를 주문한 사람 수} / {전체 주문한 사람 수} * 100% (현재 임의로 200px 적용) */}
                                                                {/* TODO: input이 비활성화된 상태이면(주문 완료) bg-primary로 변경 */}
                                                                <div className={`h-full absolute inset-y-0 left-0 ${'bg-gray-500'} ${'w-[200px]'}`} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                )}
                                            </RadioGroup.Option>
                                        ))}
                                    </RadioGroup>
                                    {/* {_.map(orders?.menu, (menu: any, idx: number) => {
                                        return (
                                            <div
                                                key={`menu-list-${index}-${idx}`}
                                                className=""
                                            >
                                                <input
                                                    id={`menu-list-${index}-${idx}`}
                                                    type="radio"
                                                    value={`${index}-${idx}`}
                                                    {...register(`order`)}
                                                />
                                                <label
                                                    className="radio-label text-xs"
                                                    htmlFor={`menu-list-${index}-${idx}`}
                                                >
                                                    {menu.name}
                                                </label>
                                            </div>
                                        );
                                    })} */}
                                </div>
                                {/* QR코드 자리 */}
                                <div className="flex-none m-3 bg-gray-300 w-24 h-24" />
                            </div>
                        </div>
                    );
                })}
                <form className="p-3">
                    <label>요청사항 (선택)</label>
                    <input
                        className="input"
                        placeholder="ex: 고수 빼주세요."
                        type="text"
                        disabled // TODO: 디폴트 = enable, 주문하기 버튼 누르면 disable, 변경 버튼 누르면 다시 enable
                        {...register('option')}
                    />
                    <p className="description">* 식당 사정 등으로 인해 반영되지 않을 경우 슬랙으로 안내 드릴게요 :)</p>
                </form>
            </div>
        </FormProvider>
    );
}