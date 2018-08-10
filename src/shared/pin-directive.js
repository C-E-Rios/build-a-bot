export default function (element, binding) {
  Object.keys(binding.value).forEach((position) => {
    element.style[position] = binding.value[position];
  });

  element.style.position = 'absolute';
  element.style.color = 'white';
  element.style['background-color'] = 'red';
  element.style.padding = '3px';
}


// Another way of writing directives
// function applyStyle(element, binding) {
//   Object.keys(binding.value).forEach((position) => {
//     element.style[position] = binding.value[position];
//   });

//   element.style.position = 'absolute';
//   element.style.color = 'white';
//   element.style['background-color'] = 'red';
//   element.style.padding = '3px';
// }

// export default {
//   bind: (element, binding) => {
//     applyStyle(element, binding);
//   },
//   udpate: (element, binding) => {
//     applyStyle(element, binding);
//   },
//   inserted: (element, binding) => {
//     console.log(element, binding);
//   },
//   componentUpdated: (element, binding) => {
//     console.log(element, binding);
//   },
//   unbind: (element, binding) => {
//     console.log(element, binding);
//   },
// };

