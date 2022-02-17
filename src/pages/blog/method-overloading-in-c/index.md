---
date: 2022-02-17T19:32:16.010Z
layout: blog
path: csharp-method-overloading
featuredImage: bunnies_cups.jpeg
title: Method Overloading in C#
---
When I took a position at Zapproved (I know, I didn't write a "first day at Zapproved" post, forgive me), I was excited to begin working with a strongly-typed backend language. My strengths and experience were mostly in JavaScript a la React & Node, with an emphasis on React and frontend work, so working with C#/.NET was bound to be a challenge, albeit an exciting one!

Moving from functional to object oriented programming is quite the shift, and I'm learning a lot. I figured I'd document some of my learnings here so I can refer back to them later. Today, I'm writing about method overloading.

When I got my first ticket at Zapproved, I was scouring the code, digging into classes and their respective methods when I realized that some classes seemed to have two methods with the same name. For example, there'd be something like a `UpdateUserCommand` class with two methods named `Execute`. Both methods had the same visibility, the same return type; the only difference was that they took different parameters. My first thought was, "this is a legacy codebase, and surely this is some weird mistake." However, I googled "c sharp class with duplicate methods," I discovered that this was a common and intentional pattern in C# called `method overloading`. Here's what [geeksforgeeks](https://www.geeksforgeeks.org/c-sharp-method-overloading/) had to say about it:

> Method Overloading is the common way of implementing [polymorphism](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/polymorphism). It is the ability to redefine a function in more than one form. A user can implement function overloading by defining two or more functions in a class sharing the same name. 
>
> * Overloaded methods are differentiated based on the number and type of the parameters passed as arguments to the methods.
>   You can not define more than one method with the same name, Order and the type of the arguments. It would be compiler error.
> * The compiler does not consider the return type while differentiating the overloaded method. But you cannot declare two methods with the same signature and different return type.  It will throw a compile-time error. If both methods have the same parameter types, but different return type, then it is not possible.

*WhatTheWhat.*

Coming from JavaScript, where I rarely utilized OOP, this concept was brand spankin' new. But also kind of interesting...

```
// An example of a class using method overloading
public class MethodOverloader {

  public int add(int a, int b)
  {
    return a + b;
  }

  // change number of parameters
  public int add(int a, int b, int c) 
  {
    return a + b + c;
  }

  // changing parameter AND return types
  public float add(float a, float b, float c)
  {
    return a + b + c;
  }
}
```

However, just because something's neat doesn't mean it's useful. What I've read suggests that method overloading should only be used when you actually need two methods to perform the same task, using different parameters. I can imagine that method overloading might be helpful if you're consuming unreliable data. 

Let's say you're working with a numerical values, and you're never certain if they're going to be integers, doubles, or even strings. You'd be able to build methods to accommodate each parameter type, but always delivering a result based on the addition of numerical values.

```
// An example of a class using method overloading
public class MethodOverloader {

  public int add(int a, int b)
  {
    return a + b;
  }

  public int Add(string a, string b) 
  {
    return Convert.ToInt32(a) + Convert.ToInt32(b);
  }
}
```
If I know that I'm either getting two strings or two integers to work with, I can now use `MethodOverloader.add()` to reliably calculate the sum of the values.

Hope this helped someone, but if not, it helped me!