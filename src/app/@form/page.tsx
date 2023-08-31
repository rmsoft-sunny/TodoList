"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import React from "react";
import Data from "../@data/page";
import { Controller, useForm } from "react-hook-form";
import { schema } from "../schema/DataSchema";
import { Todo } from "../types/type";
import { useTodoStore } from "../schema/Store";

function Form() {
  const addTodo = useTodoStore((state) => state.addTodo);
  const putTodo = useTodoStore((state) => state.putTodo);
  const todos = useTodoStore();
  const todoList = todos.todos;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = (data: any) => {
    console.log(data);

    const validtion = schema.safeParse(data);
    if (validtion.success) {
      const newTodo: Todo = {
        id: Date.now(),
        title: data.title,
        content: data.content,
      };
      addTodo(newTodo);
      reset();
    }
  };

  const updateTodo = (updatedTodo: Todo) => {
    putTodo(updatedTodo);
  };

  return (
    <div>
      <form
        className=" flex flex-col	items-center justify-center	 mx-auto m-3 "
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="flex gap-2 items-center m-3 ">
          <p>제목:</p>

          <Controller
            name="title"
            control={control}
            rules={{
              required: "제목은 필수 입력 사항입니다.",
              minLength: {
                value: 1,
                message: "제목은 최소 1자 이상 입력해야합니다.",
              },
              maxLength: {
                value: 15,
                message: "제목은 최대 15자까지 입력 가능합니다.",
              },
            }}
            render={({ field }) => (
              <div className="flex flex-col">
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="내용을 입력하세요."
                  className="w-[255px]"
                />
                {errors.title && (
                  <p className=" text-red-500 text-xs ">
                    {errors?.title?.message as string}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <div className="flex gap-2 items-center m-3">
          <p>내용:</p>
          <Controller
            name="content"
            control={control}
            rules={{
              required: "내용은 필수 입력 사항입니다.",
              minLength: {
                value: 5,
                message: "내용은 최소 5자 이상 입력해야합니다.",
              },
              maxLength: {
                value: 10,
                message: "내용은 최대 20자까지 입력 가능합니다.",
              },
            }}
            render={({ field }) => (
              <div className="flex flex-col">
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="내용을 입력하세요."
                  className="w-[255px]"
                />
                {errors.content && (
                  <p className=" text-red-500 text-xs ">
                    {errors?.content?.message as string}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <Button type="submit" className="w-[300px] m-3">
          확인
        </Button>
      </form>
      <Data
        todoList={todoList}
        deleteTodo={todos.deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default Form;
