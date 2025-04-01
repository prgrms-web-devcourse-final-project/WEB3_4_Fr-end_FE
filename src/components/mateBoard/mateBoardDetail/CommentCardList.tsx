import CommentCard from "./CommentCard";
export default function CommentCardList() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <CommentCard key={i} />
      ))}
    </div>
  );
}
