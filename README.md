# Blockchain Course

Code from the Udemy
[Ethereum and Solidity: The Complete Developer's Guide course](https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide)
by Stephen Grider.

## Progress

Section 4 - Beginning Lottery App

## Security

The deploy scripts are not included, for security of my seed words and Infura API ID. Although I will never use either of them for a real app, you can never be too careful.

### Differences

There will inevitably be differences between my code and Stephen's. I will
point out the most relevant parts below.

#### Lottery

In the lottery app, I use `enterLottery()` instead of `onSubmit()` and `pickWinner()` instead of `onClick()`.

I have implemented the lastWinner storage in my Lottery contract and use it in the lottery app.
