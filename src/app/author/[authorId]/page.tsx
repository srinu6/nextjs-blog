import { Container } from "@/components/ui/custom/container";
import Timestamp from "@/components/ui/custom/timestamp";
import { Button } from "@/components/ui/button";
import { Blog } from "@/db/models/blog";
import { FilePenLine, SquareChartGantt, Trash2 } from "lucide-react";
import Link from "next/link";
import { DeleteBlogAction } from "./action";
import { getSession } from "@/lib/session";

type Props = {
  params: Promise<{ authorId: string }>;
};

export default async function AuthorBlogsPage({ params }: Props) {
  const { authorId } = await params;
  const token = await getSession();
  const userId = token?.userDetails?.id;
  const blogs = await Blog.findAll({
    where: {
      userId: authorId,
    },
  });
  return (
    <Container className="flex flex-col gap-4 mt-8">
      {blogs.map((b, i) => (
        <div className="px-8 py-4 border rounded-md shadow" key={b.id}>
          <div className="flex flex-row justify-between items-center">
            <p className="text-xl font-medium">{b.title}</p>
            <div className="flex flex-row gap-2">
              <Button type="button" asChild variant="outline">
                <Link href={`/blog/${b.id}`}>
                  <SquareChartGantt /> View
                </Link>
              </Button>
              <Button type="button" asChild variant="outline" disabled={userId !== b.userId}>
                <Link
                  href={{
                    pathname: "/blog/edit",
                    query: { blogId: b.id },
                  }}
                >
                  <FilePenLine /> Edit
                </Link>
              </Button>
              <form action={DeleteBlogAction}>
                <input hidden type="text" name="blogId" defaultValue={b.id} />
                <input
                  hidden
                  type="text"
                  name="authorId"
                  defaultValue={authorId}
                />
                <Button type="submit" variant="outline" disabled={userId !== b.userId}>
                  <Trash2 /> Delete
                </Button>
              </form>
            </div>
          </div>
          <Timestamp date={new Date(b?.createdAt || "")} />
        </div>
      ))}
    </Container>
  );
}