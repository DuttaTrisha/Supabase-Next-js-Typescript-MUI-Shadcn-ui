"use client";

import { useQuery } from "@tanstack/react-query";
import supabase from "@/config/supabaseClient";
import { Shakes } from "@/types/types";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

const fetchShakes = async (): Promise<Shakes[]> => {
  const { data, error } = await supabase
    .from("shakes")
    .select("*")
    .order("id", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data as Shakes[];
};

const ShowShakes: React.FC = () => {
  const { data, isLoading, error } = useQuery<Shakes[]>({
    queryKey: ["shakes"],
    queryFn: fetchShakes,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-6">
        <Alert severity="error">Failed to load shakes: {error.message}</Alert>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Typography variant="h4" align="center" gutterBottom>
        All Shakes
      </Typography>
      <Grid container spacing={3} alignItems="stretch">
        {data && data.length > 0 ? (
          data.map((shake) => (
            <Grid item xs={12} sm={6} md={4} key={shake.id}>
              <Card className="shadow-md rounded-2xl h-full flex flex-col">
                <CardContent className="flex flex-col flex-grow">
                  <Typography variant="h6" component="div" gutterBottom>
                    {shake.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="mb-2 flex-grow"
                  >
                    {shake.method}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    ⭐ {shake.rating}/5
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Alert severity="info">No shakes found. Create one!</Alert>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default ShowShakes;
