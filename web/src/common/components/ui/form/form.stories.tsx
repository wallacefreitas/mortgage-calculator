import { Meta } from "@storybook/react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "./form";
import { Input } from "../input/input";
import { Button } from "../button/button";
import { useForm } from "react-hook-form";

const meta: Meta<typeof Form> = {
  title: "UI/Form",
  component: Form,
  argTypes: {
    children: {
      control: false,
    },
  },
};

export default meta;

export const DefaultForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Enter your name" />
              </FormControl>
              <FormDescription>
                This is your name for identification purposes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="btn-primary">
          Submit
        </Button>
      </form>
    </Form>
  );
};
