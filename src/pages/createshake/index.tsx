// import { useForm,SubmitHandler } from "react-hook-form";
// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useState } from "react";
// import supabase from "@/config/supabaseClient";
// import { NewShake, Shakes } from "@/types/types";
// import { useRouter } from "next/navigation";
// import { useMutation } from "@tanstack/react-query";
// import { TextField, Button, CircularProgress } from "@mui/material";
// //import { Card, CardContent } from "@shadcn/ui";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';


// const validationSchema = Yup.object().shape({
//   title: Yup.string().required("Title is required"),
//   method: Yup.string().required("Method is required"),
//   rating: Yup.number()
//     .required("Rating is required")
//     .min(1, "Rating must be at least 1")
//     .max(5, "Rating must be at most 5"),
// });

// const createShake = async (data: NewShake): Promise<Shakes> => {
//   const { title, method, rating } = data;
//   const { data: inserted, error } = await supabase
//     .from("shakes")
//     .insert([{ title, method, rating }])
//     .select()
//     .single();

//   if (error) throw new Error(error.message);

//   return inserted as Shakes; 
// };

// const CreateShakeForm: React.FC = () => {
//   const [submitError, setSubmitError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const router = useRouter();

//  const {
//   register,
//   handleSubmit,
//   formState: { errors },
// } = useForm<NewShake>({
//   resolver: yupResolver(validationSchema),
// });

//   const mutation = useMutation({
//     mutationFn: createShake,
//     onSuccess: () => {
//       setSuccessMessage("Shake created successfully!");
//       setTimeout(() => {
//         router.push("/showshakes");
//       }, 1000);
//     },
//     onError: (error: any) => {
//       setSubmitError(error.message);
//     },
//   });

//   // const onSubmit = async (data: Shakes) => {
//   //   mutation.mutate(data);
//   // };
//   const onSubmit: SubmitHandler<Shakes> = async (data) => {
//   mutation.mutate(data);
// };

//   return (
//     <div className="create-shake-form max-w-lg mx-auto p-4">
//       <Card>
//         <CardContent>
//           <h2 className="text-2xl font-semibold text-center">Create New Shake</h2>

//           {successMessage && (
//             <div className="bg-green-200 text-green-800 p-3 rounded my-2">
//               {successMessage}
//             </div>
//           )}
//           {submitError && (
//             <div className="bg-red-200 text-red-800 p-3 rounded my-2">
//               {submitError}
//             </div>
//           )}

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div className="form-group">
//               <label htmlFor="title" className="block text-sm font-medium">
//                 Title
//               </label>
//               <TextField
//                 {...register("title")}
//                 variant="outlined"
//                 fullWidth
//                 error={!!errors.title}
//                 helperText={errors.title?.message}
//                 className="mt-2"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="method" className="block text-sm font-medium">
//                 Method
//               </label>
//               <TextField
//                 {...register("method")}
//                 variant="outlined"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 error={!!errors.method}
//                 helperText={errors.method?.message}
//                 className="mt-2"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="rating" className="block text-sm font-medium">
//                 Rating
//               </label>
//               <TextField
//                 {...register("rating", { valueAsNumber: true })}
//                 variant="outlined"
//                 fullWidth
//                 type="number"
//                 inputProps={{ min: 1, max: 5 }}
//                 error={!!errors.rating}
//                 helperText={errors.rating?.message}
//                 className="mt-2"
//               />
//             </div>

//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               disabled={mutation.isPending}
//               sx={{mt:2}}
//             >
//               {mutation.isPending ? (
//                 <CircularProgress size={24} />
//               ) : (
//                 "Create Shake"
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default CreateShakeForm;

"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import supabase from "@/config/supabaseClient";
import { NewShake, Shakes } from "@/types/types";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  TextField,
  // Button,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { Button } from "@/components/ui/button";


const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  method: Yup.string().required("Method is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
});


const createShake = async (data: NewShake): Promise<Shakes> => {
  const { title, method, rating } = data;
  const { data: inserted, error } = await supabase
    .from("shakes")
    .insert([{ title, method, rating }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return inserted as Shakes;
};

const CreateShakeForm: React.FC = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewShake>({
    resolver: yupResolver(validationSchema),
  });

  const mutation = useMutation<Shakes, Error, NewShake>({
    mutationFn: createShake,
    onSuccess: () => {
      setSuccessMessage("Shake created successfully!");
      setTimeout(() => {
        router.push("/showshakes");
      }, 1000);
    },
    onError: (error) => {
      setSubmitError(error.message);
    },
  });

  // ✅ onSubmit properly typed with NewShake
  const onSubmit: SubmitHandler<NewShake> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="create-shake-form max-w-lg mx-auto p-4">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-semibold text-center">
            Create New Shake
          </h2>

          {successMessage && (
            <div className="bg-green-200 text-green-800 p-3 rounded my-2">
              {successMessage}
            </div>
          )}
          {submitError && (
            <div className="bg-red-200 text-red-800 p-3 rounded my-2">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <TextField
                {...register("title")}
                variant="outlined"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
                className="mt-2"
              />
            </div>

            {/* Method */}
            <div className="form-group">
              <label htmlFor="method" className="block text-sm font-medium">
                Method
              </label>
              <TextField
                {...register("method")}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                error={!!errors.method}
                helperText={errors.method?.message}
                className="mt-2"
              />
            </div>

            {/* Rating */}
            <div className="form-group">
              <label htmlFor="rating" className="block text-sm font-medium">
                Rating
              </label>
              <TextField
                {...register("rating", { valueAsNumber: true })}
                variant="outlined"
                fullWidth
                type="number"
                inputProps={{ min: 1, max: 5 }}
                error={!!errors.rating}
                helperText={errors.rating?.message}
                className="mt-2"
              />
            </div>

            {/* Submit */}
            {/* <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={mutation.isPending}
              sx={{ mt: 2 }}
            >
              {mutation.isPending ? (
                <CircularProgress size={24} />
              ) : (
                "Create Shake"
              )}
            </Button> */}
            <Button>
              {mutation.isPending ? (
                <CircularProgress size={24} />
              ) : (
                "Create Shake"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateShakeForm;

