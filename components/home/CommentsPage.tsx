import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoArrowUndoOutline } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import data from '../../public/data/data.json';

interface Comment {
  id: number;
  userId: number;
  userName: string;
  userImage: string;
  text: string;
  timestamp: string;
  replies: Reply[];
}

interface Reply {
  id: number;
  userId: number;
  userName: string;
  userImage: string;
  text: string;
  timestamp: string;
}

interface ReplyingToInfo {
  commentId: number;
  userName: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>(data[0].comments || []);
  const [inputText, setInputText] = useState('');
  const [replyingTo, setReplyingTo] = useState<ReplyingToInfo | null>(null);
  const [showDeleteFor, setShowDeleteFor] = useState<string | null>(null);

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (replyingTo) {
      // Handle Reply
      const updatedComments = comments.map(comment => {
        if (comment.id === replyingTo.commentId) {
          return {
            ...comment,
            replies: [...comment.replies, {
              id: comment.replies.length + 1,
              userId: 1,
              userName: "Alex Mercer",
              userImage: "",
              text: inputText,
              timestamp: "Just now"
            }]
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyingTo(null);
    } else {
      // Handle New Comment
      const newComment: Comment = {
        id: comments.length + 1,
        userId: 1,
        userName: "Alex Mercer",
        userImage: "",
        text: inputText,
        timestamp: "Just now",
        replies: []
      };
      setComments([...comments, newComment]);
    }
    setInputText('');
  };

  const handleDelete = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    setShowDeleteFor(null);
  };

  return (
    <div className="w-full relative min-h-[400px] flex flex-col bg-white p-5 py-5">
      {/* Comments List */}
      <div className="flex-1 space-y-1 overflow-y-auto pb-16">
        {comments.map((comment) => (
          <div key={comment.id}>
            {/* Main Comment */}
            <div className={`p-4 ${comment.userId === 1 ? 'bg-emerald-600 bg-opacity-10 text-black' : 'bg-[#FFF8F0]'}`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  comment.userId === 1 ? 'bg-[#FDE8CD] border ' : ' '
                }`}>
                  <span className={`text-sm font-medium ${
                    comment.userId === 1 ? 'text-black b' : 'text-emerald-600'
                  }`}>
                    {getInitials(comment.userName)}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm  text-[#0f0f0f] font-bold">{comment.userName}</h4>
                    <div className="flex items-center gap-2 relative">
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      {comment.userId === 1 && (
                        <>
                          <button 
                            onClick={() => setShowDeleteFor(showDeleteFor === `comment-${comment.id}` ? null : `comment-${comment.id}`)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <BsThreeDotsVertical className="w-4 h-4 text-gray-500" />
                          </button>
                          {showDeleteFor === `comment-${comment.id}` && (
                            <div className="absolute right-0 top-8 bg-white shadow-lg rounded-md py-1 z-10">
                              <button
                                onClick={() => handleDelete(comment.id)}
                                className="w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 text-left"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-black mt-1">{comment.text}</p>
                  <button 
                    onClick={() => setReplyingTo({
                      commentId: comment.id,
                      userName: comment.userName
                    })}
                    className="text-xs text-gray-500 mt-2 flex items-center gap-1 hover:text-gray-700"
                  >
                    <IoArrowUndoOutline className="w-4 h-4" />
                    Reply
                  </button>
                </div>
              </div>
            </div>

            {/* Replies with more gap */}
            {comment.replies.map((reply) => (
              <div key={reply.id} className="ml-8 mt-3 mb-3">
                <div className="p-3 bg-[#FDE8CD] border-l-2 border-emerald-600 rounded-r-lg shadow-sm">
                  <div className="flex items-start gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      reply.userId === 1 ? 'bg-emerald-600' : 'bg-[#FDE8CD]'
                    }`}>
                      <span className={`text-xs font-medium ${
                        reply.userId === 1 ? 'text-white' : 'text-emerald-600'
                      }`}>
                        {getInitials(reply.userName)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-medium text-gray-900">{reply.userName}</h4>
                          <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            Replying to {comment.userName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 relative">
                          <span className="text-[10px] text-gray-500">{reply.timestamp}</span>
                          {reply.userId === 1 && (
                            <>
                              <button 
                                onClick={() => setShowDeleteFor(showDeleteFor === `reply-${reply.id}` ? null : `reply-${reply.id}`)}
                                className="p-0.5 hover:bg-gray-100 rounded-full"
                              >
                                <BsThreeDotsVertical className="w-3 h-3 text-gray-500" />
                              </button>
                              {showDeleteFor === `reply-${reply.id}` && (
                                <div className="absolute right-0 top-6 bg-white shadow-lg rounded-md py-1 z-10 min-w-[100px]">
                                  <button
                                    onClick={() => {
                                      const updatedComments = comments.map(c => ({
                                        ...c,
                                        replies: c.replies.filter(r => r.id !== reply.id)
                                      }));
                                      setComments(updatedComments);
                                      setShowDeleteFor(null);
                                    }}
                                    className="w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 text-left"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{reply.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Fixed Input at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t">
        {replyingTo && (
          <div className="px-4 py-2 bg-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-600">
              Replying to <span className="font-medium">{replyingTo.userName}</span>
            </span>
            <button
              onClick={() => setReplyingTo(null)}
              className="p-1 hover:bg-gray-200 rounded-full"
            >
              <IoClose className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium text-white">
              {getInitials("Alex Mercer")}
            </span>
          </div>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={replyingTo ? `Reply to ${replyingTo.userName}...` : "Write a comment..."}
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
}
