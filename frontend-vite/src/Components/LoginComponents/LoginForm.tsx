import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const formSchema = z.object({
  username: z.string().min(1, {
    message: "Nezadaný Login",
  }),
  password: z.string().min(1, {
    message: "Nezadané heslo",
  }),
});
interface Props {
  onSubmit: (vals: FieldValues) => void;
  disabled: boolean;
  colour: string;
}
//Funkčná komponenta vracia formulare pre meno a heslo užívatela.
export const LoginForm = ({ onSubmit, disabled, colour }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Prihlásenie</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem style={{ height: "100%" }}>
                <FormControl>
                  <Input
                    placeholder="Používateľské Meno"
                    {...field}
                    disabled={disabled}
                    style={{ color: colour }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem style={{ height: "100%" }}>
                <FormControl>
                  <Input
                    placeholder="Heslo"
                    {...field}
                    disabled={disabled}
                    style={{ color: colour }}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "10px" }}
          >
            Prihlásiť sa
          </Button>
        </form>
      </Form>
    </div>
  );
};
