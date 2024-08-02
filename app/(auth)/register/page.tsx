import { FC } from 'react';

const page = () => {
  return (
    <div>
      <form>
        <input type="email" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default page;
