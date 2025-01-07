import { Container } from "@/components/ui/custom/container";
import { Spinner } from "@/components/ui/custom/spinner";
import React from "react";

export default function Loading() {
    console.log('loading...')
  return (
    <Container>
      <Spinner />
    </Container>
  );
}