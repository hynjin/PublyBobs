import { useState, useEffect, useCallback } from 'react';
import * as DateHelper from '../helper/DateHelper';
import {
    Controller,
    Control,
    FieldValues,
    useFieldArray,
} from 'react-hook-form';
import _ from 'lodash';

type AddMenuFormProps = {
    control: Control<FieldValues, any>;
    index: number;
};

export default function AddMenuForm(props: AddMenuFormProps) {
    const { control, index } = props;

    const emptyMenu = {
        name: '',
        description: '',
    };

    const { fields, append, remove } = useFieldArray({
        name: `order.${index}.menu`,
        control,
    });
    return (
        <div key={`order-${index}`}>
            {fields.map((field, idx) => {
                return (
                    <div key={field.id}>
                        <div className="mb-6 flex">
                            <Controller
                                control={control}
                                name={`order.${index}.menu.${idx}.name`}
                                render={({ field }) => (
                                    <input
                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                        type="text"
                                        placeholder="새로운 메뉴"
                                        {...field}
                                    />
                                )}
                            />
                            <button
                                type="button"
                                className="btn"
                                onClick={() => {
                                    remove(idx);
                                    console.log('+++ remvo', idx);
                                }}
                            >
                                메뉴 삭제
                            </button>
                        </div>
                        <div className="mb-6">
                            <Controller
                                control={control}
                                name={`order.${index}.menu.${idx}.description`}
                                render={({ field }) => (
                                    <input
                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                        type="text"
                                        placeholder="메모를 추가할 수 있어요. (40자)"
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                    </div>
                );
            })}

            <button
                type="button"
                className="btn"
                onClick={() => append(emptyMenu)}
            >
                메뉴 추가
            </button>
        </div>
    );
}
