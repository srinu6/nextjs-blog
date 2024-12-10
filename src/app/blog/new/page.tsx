"use client";

import { Container } from "@/components/ui/custom/container";
import { Editor } from "@/components/ui/custom/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Blog() {
  const [editorData, setEditorData] = useState("");

  return (
    <Container>
      <h1 className="mb-8">From Thoughts to Words: Blog Without Limits</h1>
      <Label htmlFor="title" className="inline-block mb-2">
        Title
      </Label>
      <Input id="title" />
      <div className="my-4">
        <Editor data={editorData} onChange={(data) => setEditorData(data)} />
      </div>
      <Button>Publish</Button>
    </Container>
  );
}