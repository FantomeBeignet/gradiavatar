# Gradiavatar

Gradiavatar is a simple tool to generate a gradient avatar from a string.

## Usage

### Interactive mode

The homepage of the project is a simple interactive mode where you can enter a string and see the result.

You can customize some of the options, such as the gradient mode (linear or radial), the gradient direction or offset and the presence of the text string's initial letter.

### API

The API provides two endpoints:

- `/linear/[str]` to generate a linear gradient avatar
- `/radial/[str]` to generate a radial gradient avatar

You can pass the following parameters to the query string:

- `size` (default: 256): the size of the image in pixels
- `initial` (default: false): whether to display the initial letter of the string

For linear gradients, you can also pass the following parameter:

- `direction` (default: diagonal): the direction of the gradient, which can be one of the following values: `vertical`, `horizontal`, `diagonal`, `antidiagonal`

For radial gradients, you can also pass the following parameter:

- `offset` (default: `northeast`): the offset of the gradient from the center of the circle, which can be one of the following values: `north`, `northeast`, `east`, `southeast`, `south`, `southwest`, `west`, `northwest`

Both endpoints return a simple SVG image.

## Examples

### Linear gradient

#### Simple linear gradient

`/linear/Gradiavatar`

![Gradiavatar](https://avatar.fantomebeig.net/linear/Gradiavatar)

#### Linear gradient with initial letter

`/linear/Gradiavatar?initial`

![Gradiavatar with initial](https://avatar.fantomebeig.net/linear/Gradiavatar?initial)

#### Linear gradient with vertical direction

`/linear/Gradiavatar?direction=vertical`

![Gradiavatar with vertical direction](https://avatar.fantomebeig.net/linear/Gradiavatar?direction=vertical)

### Radial gradient

#### Simple radial gradient

`/radial/Gradiavatar`

![Gradiavatar radial](https://avatar.fantomebeig.net/radial/Gradiavatar)

#### Radial gradient with initial letter

`/radial/Gradiavatar?initial`

![Gradiavatar radial with initial](https://avatar.fantomebeig.net/radial/Gradiavatar?initial)

#### Radial gradient with southwest offset

`/radial/Gradiavatar?offset=southwest`

![Gradiavatar radial with southwest offset](https://avatar.fantomebeig.net/radial/Gradiavatar?offset=southwest)
