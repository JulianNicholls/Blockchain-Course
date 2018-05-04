# Blockchain Course

Code from the Udemy
[Ethereum and Solidity: The Complete Developer's Guide course](https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide)
by Stephen Grider.

## Progress

Section 5 - Campaign App, just finished initial campaign details page

## Security

The deploy scripts are not included, for security of my seed words and Infura API ID. Although I will never use either of them for a real app, you can never be too careful.

### Differences

There will inevitably be differences between my code and Stephen's. I will
point out the most relevant parts below.

#### Testing of failures

In the tests which have the form

    it('should fail xxx', () => {
      try {
        await xxx.methods.xxx().send({
          xxx: xxx,
          xxx: xxx
        });

        assert(false);
      } catch (err) {
        assert(err);
      }
    };

The `catch(err)` will always be entered even when the `assert(false)` is hit, making the test
null and void. A change is needed to the assert inside to `assert.equal(err.name, 'c')`.

    ...
    } catch (err) {
      assert.equal(err.name, 'c');
    }

#### Lottery

In the lottery app, I use `enterLottery()` instead of `onSubmit()` and `pickWinner()` instead of `onClick()`.

I have implemented the lastWinner storage in my Lottery contract and use it in the lottery app.

#### Campaign

I have used `contributors` and `contributorsCount` for contributors in the contract and
subsequent summary page.
The Request struct still has `approvals` and `approvalCount` though.
My finalise function is called `finaliseRequest()` with an s.
