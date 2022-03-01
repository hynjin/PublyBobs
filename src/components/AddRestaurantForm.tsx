import { useState, useEffect, useCallback } from 'react';
import * as DateHelper from '../helper/DateHelper';
import {
    Controller,
    Control,
    FieldValues,
    useFieldArray,
} from 'react-hook-form';
import AddMenuForm from './AddMenuForm';

type AddRestaurantFormProps = {
    // field: Record<'id', string>;
    control: Control<FieldValues, any>;
    index: number;
};

export default function AddRestaurantForm(props: AddRestaurantFormProps) {
    const { control, index } = props;

    return (
        <>
            <div key={`add-restaurant-${index}`}>
                <div className="mb-6">
                    <Controller
                        control={control}
                        name={`order.${index}.restaurant.name`}
                        render={({ field }) => (
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="text"
                                placeholder="식당 이름"
                                {...field}
                            />
                        )}
                    />
                </div>
                <div className="mb-6">
                    <Controller
                        control={control}
                        name={`order.${index}.restaurant.url`}
                        render={({ field }) => (
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="text"
                                placeholder="URL"
                                {...field}
                            />
                        )}
                    />
                </div>
            </div>
        </>
    );
}
