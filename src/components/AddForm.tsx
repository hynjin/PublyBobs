// import _ from 'lodash';
// import { useState, useEffect } from 'react';
// import { useForm, useFieldArray, Controller } from 'react-hook-form';

// // const daysOfWeek = { mon: 0 };
// export default function AddChefForm() {
//     const {
//         register,
//         control,
//         handleSubmit,
//         reset,
//         watch,
//         formState: { isSubmitting },
//     } = useForm();
//     const { fields, append, prepend, remove, swap, move, insert, replace } =
//         useFieldArray({
//             control,
//             name: 'day',
//         });

//     const onSubmit = () => console.log('data');

//     const chefArray = Array(5);
//     const [restaurant, setRestaurant] = useState({
//         name: '',
//         url: '',
//         description: '',
//     });

//     const onClickAddRestaurant = async () => {
//         const res = await fetch('/api/restaurants', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(restaurant),
//         });
//     };

//     const daysOfWeek = ['월요일', '화요일', '수요일', '목요일', '금요일'];

//     return (
//         <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="lg:mx-auto max-w-xl lg:px-8 mt-4"
//         >
//             dldfkl
//             {fields.map((item, index) => {
//                 return (
//                     <div key={item.id} className="md:flex md:items-center mb-6">
//                         <section className={'section'} key={item.id}>
//                             <input
//                                 className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
//                                 id={`add-chef-${index}`}
//                                 type="text"
//                                 placeholder={daysOfWeek[index]}
//                                 {...register(`day.[${index}].chef` as const)}
//                             />
//                             <Controller
//                                 render={({ field }) => <input {...field} />}
//                                 name={`day.[${index}].chef`}
//                                 control={control}
//                             />
//                         </section>
//                     </div>
//                 );
//             })}
//             sdf
//             {/* <div className="md:flex md:items-center mb-6">
//                 <input
//                     className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
//                     id="add-chef"
//                     type="text"
//                     placeholder="월요일"
//                     value={restaurant.name}
//                     onChange={(e) =>
//                         setRestaurant({
//                             ...restaurant,
//                             name: e.target.value,
//                         })
//                     }
//                 />
//             </div>
//             <div className="md:flex md:items-center mb-6">
//                 <div className="md:w-1/4">
//                     <label
//                         className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
//                         htmlFor="add-retaurant-url"
//                     >
//                         URL
//                     </label>
//                 </div>
//                 <div className="md:w-2/4">
//                     <input
//                         className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
//                         id="add-retaurant-url"
//                         type="text"
//                         placeholder="여기에 식당 url을"
//                         value={restaurant.url}
//                         onChange={(e) =>
//                             setRestaurant({
//                                 ...restaurant,
//                                 url: e.target.value,
//                             })
//                         }
//                     />
//                 </div>
//             </div>
//             <div className="md:flex md:items-center mb-6">
//                 <div className="md:w-1/4">
//                     <label
//                         className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
//                         htmlFor="add-retaurant-description"
//                     >
//                         식당 설명
//                     </label>
//                 </div>
//                 <div className="md:w-2/4">
//                     <input
//                         className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
//                         id="add-retaurant-description"
//                         type="text"
//                         placeholder="여기에 식당 설명을"
//                         value={restaurant.description}
//                         onChange={(e) =>
//                             setRestaurant({
//                                 ...restaurant,
//                                 description: e.target.value,
//                             })
//                         }
//                     />
//                 </div>
//             </div>
//             <div className="md:flex md:items-center">
//                 <div className="md:w-1/4"></div>
//                 <div className="md:w-2/4">
//                     <button
//                         className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
//                         type="submit"
//                     >
//                         식당 추가
//                     </button>
//                 </div>
//             </div> */}
//         </form>
//     );
// }

import * as React from 'react';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';

type FormValues = {
    cart: {
        name: string;
        price: number;
        quantity: number;
    }[];
};

const Total = ({ control }: { control: Control<FormValues> }) => {
    const formValues = useWatch({
        name: 'cart',
        control,
    });
    const total = formValues.reduce(
        (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
        0
    );
    return <p>Total Amount: {total}</p>;
};

export default function App() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            cart: [{ name: 'test', quantity: 1, price: 23 }],
        },
        mode: 'onBlur',
    });
    const { fields, append, remove } = useFieldArray({
        name: 'cart',
        control,
    });
    const onSubmit = (data: FormValues) => console.log(data);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => {
                    return (
                        <div key={field.id}>
                            <section className={'section'} key={field.id}>
                                <input
                                    placeholder="name"
                                    {...register(
                                        `cart.${index}.name` as const,
                                        {
                                            required: true,
                                        }
                                    )}
                                    className={
                                        errors?.cart?.[index]?.name
                                            ? 'error'
                                            : ''
                                    }
                                />
                                <input
                                    placeholder="quantity"
                                    type="number"
                                    {...register(
                                        `cart.${index}.quantity` as const,
                                        {
                                            valueAsNumber: true,
                                            required: true,
                                        }
                                    )}
                                    className={
                                        errors?.cart?.[index]?.quantity
                                            ? 'error'
                                            : ''
                                    }
                                />
                                <input
                                    placeholder="value"
                                    type="number"
                                    {...register(
                                        `cart.${index}.price` as const,
                                        {
                                            valueAsNumber: true,
                                            required: true,
                                        }
                                    )}
                                    className={
                                        errors?.cart?.[index]?.price
                                            ? 'error'
                                            : ''
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                >
                                    DELETE
                                </button>
                            </section>
                        </div>
                    );
                })}

                <Total control={control} />

                <input type="submit" />
            </form>
        </div>
    );
}
