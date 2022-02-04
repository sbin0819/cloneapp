import { FieldErrors, useForm } from 'react-hook-form';

// Better validation
// Better Errors (set, clear, display)
// Have control over inputs
// Dont deal with events
// Easier Inputs

interface LoginForm {
  username: string;
  email: string;
  password: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginForm>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const onValid = (data: LoginForm) => {
    console.log(data);
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register('username', {
          required: 'Username is required',
          minLength: {
            message: 'The username should be longer then 5 char.',
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      {errors.username?.message}
      <input
        {...register('email', {
          required: 'Email is required',
          validate: {
            notGmail: (value) =>
              !value.includes('@gmail.com') || 'Gmail is not allowed',
          },
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email?.message}
      <input
        {...register('password', { required: 'Password is required' })}
        type="password"
        placeholder="Password"
      />
      {errors.password?.message}
      <input type="submit" value="Create Account" />
    </form>
  );
}
