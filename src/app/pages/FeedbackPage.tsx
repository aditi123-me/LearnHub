import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { MessageSquare, Lightbulb, Heart, Sparkles, Send } from 'lucide-react';
import { toast } from 'sonner';

export const FeedbackPage: React.FC = () => {
  const { currentUser, addFeedback, feedback } = useAuth();
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('General');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !message.trim()) return;

    const newFeedback = {
      studentId: currentUser.id,
      studentName: currentUser.name,
      message: message.trim(),
      category,
      date: new Date().toISOString().split('T')[0],
    };

    addFeedback(newFeedback);
    toast.success('Thank you for your feedback! 🎉');
    setMessage('');
    setCategory('General');
  };

  const categories = [
    { value: 'General', icon: '💬', color: 'from-blue-400 to-blue-600' },
    { value: 'Feature Request', icon: '✨', color: 'from-purple-400 to-purple-600' },
    { value: 'Bug Report', icon: '🐛', color: 'from-red-400 to-red-600' },
    { value: 'Suggestion', icon: '💡', color: 'from-yellow-400 to-yellow-600' },
    { value: 'Content', icon: '📚', color: 'from-green-400 to-green-600' },
    { value: 'UI/UX', icon: '🎨', color: 'from-pink-400 to-pink-600' },
  ];

  // Get current user's previous feedback
  const myFeedback = currentUser 
    ? feedback.filter(f => f.studentId === currentUser.id)
    : [];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Feedback & Suggestions
        </h1>
        <p className="text-gray-600">
          Help us improve your learning experience! 🚀
        </p>
      </div>

      {/* Feedback Form */}
      <Card className="border-2 border-purple-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Share Your Thoughts
          </CardTitle>
          <CardDescription>
            Your feedback helps us create a better learning platform for everyone
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div>
              <Label htmlFor="category" className="text-base mb-3 block">
                What type of feedback is this?
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      category === cat.value
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <div className="text-sm font-medium">{cat.value}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-base mb-2 block">
                Your Message
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us what you think, suggest improvements, or report any issues..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                required
                className="resize-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                Be as detailed as you like! We read every submission 💙
              </p>
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Feedback Tips */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            Feedback Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                What to include:
              </p>
              <ul className="space-y-1 text-gray-700 ml-6">
                <li>• Specific examples or scenarios</li>
                <li>• Clear descriptions of issues</li>
                <li>• Suggestions for improvements</li>
                <li>• What you liked or didn't like</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-medium flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                We appreciate:
              </p>
              <ul className="space-y-1 text-gray-700 ml-6">
                <li>• Constructive criticism</li>
                <li>• Feature ideas</li>
                <li>• UI/UX suggestions</li>
                <li>• Content requests</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Previous Feedback */}
      {myFeedback.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>My Previous Feedback</CardTitle>
            <CardDescription>Your submitted feedback history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myFeedback.map((fb) => (
                <div
                  key={fb.id}
                  className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-purple-200 text-purple-800 px-3 py-1 rounded-full font-medium">
                      {fb.category}
                    </span>
                    <span className="text-xs text-gray-500">{fb.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{fb.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Thank You Message */}
      <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300">
        <CardContent className="py-6 text-center">
          <Heart className="w-12 h-12 text-pink-600 mx-auto mb-3" />
          <p className="text-lg font-medium text-gray-800">
            Thank you for helping us improve LearnHub! 💖
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Your feedback shapes the future of our learning platform
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
