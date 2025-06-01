import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Question {
  id: number;
  title: string;
  body: string;
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  askedBy: string;
  askedDate: Date;
  userVote?: number; // 1 for upvote, -1 for downvote, undefined for no vote
}

interface Answer {
  id: number;
  body: string;
  votes: number;
  answeredBy: string;
  answeredDate: Date;
  userVote?: number; // 1 for upvote, -1 for downvote, undefined for no vote
}

interface Comment {
  id: number;
  body: string;
  votes: number;
  commentedBy: string;
  commentedDate: Date;
  userVote?: number; // 1 for upvote, -1 for downvote, undefined for no vote
  parentId: number | null; // null for top-level comments, otherwise the ID of the parent comment
  answerId: number; // ID of the answer this comment belongs to
}

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent implements OnInit {
  questionId: number = 0;
  question: Question | null = null;
  answers: Answer[] = [];
  comments: Comment[] = []; // Flat array of all comments
  loading: boolean = true;
  answerText: string = '';
  replyText: string = '';
  replyingToAnswer: number | null = null;
  replyingToComment: number | null = null; // ID of the comment being replied to

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.questionId = +params['id'];
      this.loadQuestionDetails();
    });
  }

  loadQuestionDetails(): void {
    // Simulate API call with timeout
    setTimeout(() => {
      this.question = this.getFakeQuestion(this.questionId);
      this.answers = this.getFakeAnswers(this.questionId);
      this.comments = this.getFakeComments(this.questionId);
      this.loading = false;
    }, 1000);
  }

  upvoteQuestion(): void {
    if (this.question) {
      // In a real app, this would be an API call
      console.log(`Upvoting question ${this.question.id}`);

      // If already upvoted, remove the vote
      if (this.question.userVote === 1) {
        this.question.votes--;
        this.question.userVote = undefined;
      }
      // If downvoted, change to upvote (remove downvote and add upvote)
      else if (this.question.userVote === -1) {
        this.question.votes += 2; // +1 to remove downvote, +1 to add upvote
        this.question.userVote = 1;
      }
      // If no vote, add upvote
      else {
        this.question.votes++;
        this.question.userVote = 1;
      }
    }
  }

  downvoteQuestion(): void {
    if (this.question) {
      // In a real app, this would be an API call
      console.log(`Downvoting question ${this.question.id}`);

      // If already downvoted, remove the vote
      if (this.question.userVote === -1) {
        this.question.votes++;
        this.question.userVote = undefined;
      }
      // If upvoted, change to downvote (remove upvote and add downvote)
      else if (this.question.userVote === 1) {
        this.question.votes -= 2; // -1 to remove upvote, -1 to add downvote
        this.question.userVote = -1;
      }
      // If no vote, add downvote
      else {
        this.question.votes--;
        this.question.userVote = -1;
      }
    }
  }

  upvoteAnswer(answerId: number): void {
    const answer = this.answers.find((a) => a.id === answerId);
    if (!answer) return;

    // Log the action (would be an API call in a real app)
    console.log(`Upvoting answer ${answerId}`);

    // If already upvoted, remove the vote
    if (answer.userVote === 1) {
      answer.votes--;
      answer.userVote = undefined;
    }
    // If downvoted, change to upvote
    else if (answer.userVote === -1) {
      answer.votes += 2; // +1 to remove downvote, +1 to add upvote
      answer.userVote = 1;
    }
    // If no vote, add upvote
    else {
      answer.votes++;
      answer.userVote = 1;
    }
  }

  downvoteAnswer(answerId: number): void {
    const answer = this.answers.find((a) => a.id === answerId);
    if (!answer) return;

    // Log the action (would be an API call in a real app)
    console.log(`Downvoting answer ${answerId}`);

    // If already downvoted, remove the vote
    if (answer.userVote === -1) {
      answer.votes++;
      answer.userVote = undefined;
    }
    // If upvoted, change to downvote
    else if (answer.userVote === 1) {
      answer.votes -= 2; // -1 to remove upvote, -1 to add downvote
      answer.userVote = -1;
    }
    // If no vote, add downvote
    else {
      answer.votes--;
      answer.userVote = -1;
    }
  }

  getFakeQuestion(id: number): Question {
    // In a real app, this would be an API call
    const questions = [
      {
        id: 1,
        title: 'How to implement authentication in Angular?',
        body: `<p>I am building an Angular application and need to implement user authentication. What is the best approach?</p>
               <p>I've looked into JWT tokens, but I'm not sure how to properly store them and handle token refresh. Should I use HttpInterceptors?</p>
               <p>Also, how do I protect routes for authenticated users only?</p>`,
        tags: ['angular', 'authentication', 'typescript'],
        votes: 15,
        answers: 3,
        views: 120,
        askedBy: 'john_doe',
        askedDate: new Date('2023-10-15'),
        userVote: undefined,
      },
      {
        id: 2,
        title: 'Understanding RxJS Observables in Angular',
        body: `<p>I am having trouble understanding how Observables work in Angular. Can someone explain the basics?</p>
               <p>Specifically, I'm confused about:</p>
               <ul>
                 <li>The difference between Observable and Promise</li>
                 <li>When to use pipe, map, and filter</li>
                 <li>How to properly unsubscribe to avoid memory leaks</li>
               </ul>
               <p>Any examples would be greatly appreciated!</p>`,
        tags: ['angular', 'rxjs', 'javascript'],
        votes: 23,
        answers: 5,
        views: 230,
        askedBy: 'jane_smith',
        askedDate: new Date('2023-10-10'),
        userVote: undefined,
      },
    ];

    return questions.find((q) => q.id === id) || questions[0];
  }

  getFakeAnswers(questionId: number): Answer[] {
    // In a real app, this would be an API call
    const allAnswers: Record<number, Answer[]> = {
      1: [
        {
          id: 101,
          body: `<p>For Angular authentication, I recommend using JWT tokens with HttpInterceptors. Here's a basic approach:</p>
                 <ol>
                   <li>Create an AuthService to handle login/logout and token storage</li>
                   <li>Store tokens in localStorage or preferably in a httpOnly cookie</li>
                   <li>Create an HttpInterceptor to add the token to all outgoing requests</li>
                   <li>Implement a route guard (CanActivate) to protect routes</li>
                 </ol>
                 <p>Here's a simple example of an interceptor:</p>
                 <pre><code>@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}</code></pre>`,
          votes: 8,
          answeredBy: 'angular_expert',
          answeredDate: new Date('2023-10-16'),
          userVote: undefined,
        },
        {
          id: 102,
          body: `<p>I would recommend using a library like Auth0 or Firebase Authentication. They handle a lot of the complexity for you.</p>
                 <p>With Firebase Auth, it's as simple as:</p>
                 <pre><code>import { AngularFireAuth } from '@angular/fire/auth';

@Component({...})
export class LoginComponent {
  constructor(public auth: AngularFireAuth) {}

  login() {
    this.auth.signInWithEmailAndPassword(email, password);
  }
}</code></pre>
                 <p>For route protection, you can create a guard that checks the authentication state.</p>`,
          votes: 5,
          answeredBy: 'firebase_dev',
          answeredDate: new Date('2023-10-17'),
          userVote: undefined,
        },
        {
          id: 103,
          body: `<p>Don't forget about CSRF protection when implementing authentication. JWT alone might not be enough.</p>
                 <p>Also consider implementing refresh tokens to avoid forcing users to log in again when their access token expires.</p>`,
          votes: 2,
          answeredBy: 'security_guru',
          answeredDate: new Date('2023-10-18'),
          userVote: undefined,
        },
      ],
      2: [
        {
          id: 201,
          body: `<p>Observables are a powerful way to handle asynchronous operations. Here's a simple explanation:</p>
                 <p><strong>Observable vs Promise:</strong></p>
                 <ul>
                   <li>Promises handle a single event, Observables can handle multiple events</li>
                   <li>Promises are eager, Observables are lazy (they don't execute until subscribed to)</li>
                   <li>Promises aren't cancellable, Observables can be unsubscribed from</li>
                 </ul>
                 <p><strong>Common operators:</strong></p>
                 <ul>
                   <li><code>map</code>: transforms values emitted by an Observable</li>
                   <li><code>filter</code>: filters values based on a condition</li>
                   <li><code>pipe</code>: combines multiple operators</li>
                 </ul>`,
          votes: 12,
          answeredBy: 'rxjs_master',
          answeredDate: new Date('2023-10-11'),
          userVote: undefined,
        },
      ],
    };

    return allAnswers[questionId as keyof typeof allAnswers] || [];
  }

  submitAnswer(): void {
    if (!this.answerText.trim()) {
      return;
    }

    // In a real app, this would be an API call
    // Convert plain text to HTML with paragraphs
    const formattedAnswer = this.answerText
      .split('\n\n')
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join('');

    const newAnswer: Answer = {
      id: Math.floor(Math.random() * 1000) + 200,
      body: formattedAnswer,
      votes: 0,
      answeredBy: 'current_user', // Would come from auth service
      answeredDate: new Date(),
      userVote: undefined,
    };

    this.answers.push(newAnswer);
    this.answerText = '';

    if (this.question) {
      this.question.answers++;
    }
  }

  // Get comments for a specific answer
  getCommentsForAnswer(answerId: number): Comment[] {
    return this.comments.filter(
      (comment) => comment.answerId === answerId && comment.parentId === null
    );
  }

  // Get child comments for a specific comment
  getChildComments(commentId: number): Comment[] {
    return this.comments.filter((comment) => comment.parentId === commentId);
  }

  // Check if a comment has any children
  hasChildren(commentId: number): boolean {
    return this.comments.some((comment) => comment.parentId === commentId);
  }

  // Toggle reply to answer
  toggleReplyToAnswer(answerId: number): void {
    if (this.replyingToAnswer === answerId) {
      this.replyingToAnswer = null;
      this.replyText = '';
    } else {
      this.replyingToAnswer = answerId;
      this.replyingToComment = null;
      this.replyText = '';
    }
  }

  // Toggle reply to comment
  toggleReplyToComment(commentId: number): void {
    if (this.replyingToComment === commentId) {
      this.replyingToComment = null;
      this.replyText = '';
    } else {
      this.replyingToComment = commentId;
      this.replyingToAnswer = null;
      this.replyText = '';
    }
  }

  // Cancel reply
  cancelReply(): void {
    this.replyingToAnswer = null;
    this.replyingToComment = null;
    this.replyText = '';
  }

  // Submit comment to an answer
  submitCommentToAnswer(answerId: number): void {
    if (!this.replyText.trim()) return;

    // Format the reply text
    const formattedReply = this.replyText
      .split('\n\n')
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join('');

    // Create new comment
    const newComment: Comment = {
      id: Math.floor(Math.random() * 1000) + 300,
      body: formattedReply,
      votes: 0,
      commentedBy: 'current_user', // Would come from auth service
      commentedDate: new Date(),
      parentId: null, // Top-level comment
      answerId: answerId,
      userVote: undefined,
    };

    // Add comment to the flat array
    this.comments.push(newComment);

    // Reset reply state
    this.replyingToAnswer = null;
    this.replyText = '';

    // Log the action (would be an API call in a real app)
    console.log(`Added comment to answer ${answerId}:`, newComment);
  }

  // Submit reply to a comment
  submitCommentToComment(parentCommentId: number): void {
    if (!this.replyText.trim()) return;

    // Find the parent comment to get the answerId
    const parentComment = this.comments.find((c) => c.id === parentCommentId);
    if (!parentComment) return;

    // Format the reply text
    const formattedReply = this.replyText
      .split('\n\n')
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join('');

    // Create new comment
    const newComment: Comment = {
      id: Math.floor(Math.random() * 1000) + 300,
      body: formattedReply,
      votes: 0,
      commentedBy: 'current_user', // Would come from auth service
      commentedDate: new Date(),
      parentId: parentCommentId,
      answerId: parentComment.answerId,
      userVote: undefined,
    };

    // Add comment to the flat array
    this.comments.push(newComment);

    // Reset reply state
    this.replyingToComment = null;
    this.replyText = '';

    // Log the action (would be an API call in a real app)
    console.log(`Added reply to comment ${parentCommentId}:`, newComment);
  }

  // Upvote a comment
  upvoteComment(commentId: number): void {
    const comment = this.comments.find((c) => c.id === commentId);
    if (!comment) return;

    // Log the action (would be an API call in a real app)
    console.log(`Upvoting comment ${commentId}`);

    // If already upvoted, remove the vote
    if (comment.userVote === 1) {
      comment.votes--;
      comment.userVote = undefined;
    }
    // If downvoted, change to upvote
    else if (comment.userVote === -1) {
      comment.votes += 2;
      comment.userVote = 1;
    }
    // If no vote, add upvote
    else {
      comment.votes++;
      comment.userVote = 1;
    }
  }

  // Downvote a comment
  downvoteComment(commentId: number): void {
    const comment = this.comments.find((c) => c.id === commentId);
    if (!comment) return;

    // Log the action (would be an API call in a real app)
    console.log(`Downvoting comment ${commentId}`);

    // If already downvoted, remove the vote
    if (comment.userVote === -1) {
      comment.votes++;
      comment.userVote = undefined;
    }
    // If upvoted, change to downvote
    else if (comment.userVote === 1) {
      comment.votes -= 2;
      comment.userVote = -1;
    }
    // If no vote, add downvote
    else {
      comment.votes--;
      comment.userVote = -1;
    }
  }

  // Get fake comments data
  getFakeComments(questionId: number): Comment[] {
    // In a real app, this would be an API call
    if (questionId === 1) {
      return [
        {
          id: 301,
          body: '<p>JWT tokens are great, but remember to handle token expiration properly!</p>',
          votes: 5,
          commentedBy: 'token_expert',
          commentedDate: new Date('2023-10-16'),
          parentId: null,
          answerId: 101,
          userVote: undefined,
        },
        {
          id: 302,
          body: '<p>I agree. Also consider using refresh tokens.</p>',
          votes: 3,
          commentedBy: 'security_dev',
          commentedDate: new Date('2023-10-17'),
          parentId: 301,
          answerId: 101,
          userVote: undefined,
        },
        {
          id: 303,
          body: '<p>How would you handle refresh tokens on the client side?</p>',
          votes: 2,
          commentedBy: 'curious_dev',
          commentedDate: new Date('2023-10-17'),
          parentId: 302,
          answerId: 101,
          userVote: undefined,
        },
        {
          id: 304,
          body: '<p>I typically store them in an HttpOnly cookie and have a silent refresh mechanism.</p>',
          votes: 4,
          commentedBy: 'security_dev',
          commentedDate: new Date('2023-10-18'),
          parentId: 303,
          answerId: 101,
          userVote: undefined,
        },
        {
          id: 305,
          body: "<p>That's a good approach. You can also use a service worker for this.</p>",
          votes: 1,
          commentedBy: 'advanced_dev',
          commentedDate: new Date('2023-10-18'),
          parentId: 304,
          answerId: 101,
          userVote: undefined,
        },
        {
          id: 306,
          body: '<p>Firebase Auth is indeed simple to use, but it has limitations for complex auth scenarios.</p>',
          votes: 2,
          commentedBy: 'enterprise_dev',
          commentedDate: new Date('2023-10-17'),
          parentId: null,
          answerId: 102,
          userVote: undefined,
        },
        {
          id: 307,
          body: '<p>What limitations have you encountered?</p>',
          votes: 1,
          commentedBy: 'firebase_dev',
          commentedDate: new Date('2023-10-18'),
          parentId: 306,
          answerId: 102,
          userVote: undefined,
        },
        {
          id: 308,
          body: '<p>Custom claims management and role-based access control can be cumbersome.</p>',
          votes: 3,
          commentedBy: 'enterprise_dev',
          commentedDate: new Date('2023-10-18'),
          parentId: 307,
          answerId: 102,
          userVote: undefined,
        },
      ];
    } else if (questionId === 2) {
      return [
        {
          id: 401,
          body: '<p>Great explanation of Observables vs Promises!</p>',
          votes: 3,
          commentedBy: 'angular_fan',
          commentedDate: new Date('2023-10-12'),
          parentId: null,
          answerId: 201,
          userVote: undefined,
        },
        {
          id: 402,
          body: '<p>Thanks! I find that understanding the lazy vs eager distinction is key.</p>',
          votes: 2,
          commentedBy: 'rxjs_master',
          commentedDate: new Date('2023-10-12'),
          parentId: 401,
          answerId: 201,
          userVote: undefined,
        },
        {
          id: 403,
          body: '<p>Could you explain more about the pipe operator?</p>',
          votes: 1,
          commentedBy: 'learning_dev',
          commentedDate: new Date('2023-10-13'),
          parentId: 401,
          answerId: 201,
          userVote: undefined,
        },
        {
          id: 404,
          body: '<p>The pipe operator lets you chain multiple operators together in a readable way.</p>',
          votes: 4,
          commentedBy: 'rxjs_master',
          commentedDate: new Date('2023-10-13'),
          parentId: 403,
          answerId: 201,
          userVote: undefined,
        },
        {
          id: 405,
          body: "<p>It's similar to the pipeline operator in functional programming languages.</p>",
          votes: 2,
          commentedBy: 'functional_dev',
          commentedDate: new Date('2023-10-14'),
          parentId: 404,
          answerId: 201,
          userVote: undefined,
        },
      ];
    }
    return [];
  }
}
