import React, { useState, useEffect } from "react";
import { MessageSquare, Send, Trash2, User as UserIcon, Clock } from "lucide-react";
import { db, handleFirestoreError, OperationType } from "../../firebase";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  content: string;
  createdAt: any;
}

interface CommentSectionProps {
  stockSlug: string;
}

export default function CommentSection({ stockSlug }: CommentSectionProps) {
  const { user, openLoginModal } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stockSlug) return;

    const path = "comments";
    const q = query(
      collection(db, path),
      where("stockSlug", "==", stockSlug),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];
      setComments(items);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
      setLoading(false);
    });

    return () => unsub();
  }, [stockSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openLoginModal();
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);
    const path = "comments";
    try {
      await addDoc(collection(db, path), {
        userId: user.uid,
        userName: user.displayName || "Anonym användare",
        userPhoto: user.photoURL,
        stockSlug,
        content: newComment.trim(),
        createdAt: serverTimestamp()
      });
      setNewComment("");
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!window.confirm("Är du säker på att du vill ta bort din kommentar?")) return;
    
    const path = `comments/${commentId}`;
    try {
      await deleteDoc(doc(db, "comments", commentId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Just nu";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('sv-SE', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <MessageSquare className="text-primary" size={24} />
        <h2 className="text-3xl font-serif font-bold tracking-tight">Diskussion</h2>
        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
          {comments.length}
        </span>
      </div>

      {/* Comment Form */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full border border-border" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <UserIcon size={20} />
                </div>
              )}
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Vad tänker du om detta case? Dela dina tankar..."
                  className="w-full bg-background border border-border rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[100px] resize-none"
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-[10px] text-muted font-mono uppercase tracking-widest">
                    {newComment.length}/1000 tecken
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                    className="px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                  >
                    {isSubmitting ? "Skickar..." : "Publicera"}
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted text-sm mb-4">Logga in för att delta i diskussionen.</p>
            <button
              onClick={openLoginModal}
              className="px-6 py-2 bg-primary/10 text-primary font-bold rounded-xl hover:bg-primary/20 transition-all text-sm"
            >
              Logga in
            </button>
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse flex gap-4">
                <div className="w-10 h-10 bg-muted rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-12 bg-muted rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : comments.length > 0 ? (
          <AnimatePresence initial={false}>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex gap-4 group"
              >
                {comment.userPhoto ? (
                  <img src={comment.userPhoto} alt="" className="w-10 h-10 rounded-full border border-border shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <UserIcon size={20} />
                  </div>
                )}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{comment.userName}</span>
                      <span className="text-[10px] text-muted flex items-center gap-1">
                        <Clock size={10} />
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    {user?.uid === comment.userId && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="p-1 text-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        title="Ta bort kommentar"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <div className="bg-section-alt border border-border rounded-2xl p-4 text-sm text-muted leading-relaxed">
                    {comment.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="text-center py-12 border border-dashed border-border rounded-3xl">
            <MessageSquare className="mx-auto mb-3 text-muted/20" size={32} />
            <p className="text-muted text-sm italic">Inga kommentarer än. Bli den första att tycka till!</p>
          </div>
        )}
      </div>
    </div>
  );
}
