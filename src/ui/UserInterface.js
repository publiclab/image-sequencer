/*
 * User Interface Handling Module
 */

module.exports = function UserInterface(events = {}) {

  events.onSetup = events.onSetup || function(step) {
    if (step.ui == false) {
      // No UI
    } else if(step.inBrowser) {
      // Create and append an HTML Element
      console.log('Added Step "'+step.name+'"');
    } else {
      // Create a NodeJS Object
      console.log('\x1b[36m%s\x1b[0m','Added Step "'+step.name+'"');
    }
  };

  events.onDraw = events.onDraw || function(step) {
    if (step.ui == false) {
      // No UI
    } else if(step.inBrowser) {
      // Overlay a loading spinner
      console.log('Drawing Step "'+step.name+'"');
    } else {
      // Don't do anything
      console.log('\x1b[33m%s\x1b[0m','Drawing Step "'+step.name+'"');
    }
  };

  events.onComplete = events.onComplete || function(step) {
    if (step.ui == false) {
      // No UI
    } else if(step.inBrowser) {
      // Update the DIV Element
      // Hide the laoding spinner
      console.log('Drawn Step "'+step.name+'"');
    } else {
      // Update the NodeJS Object
      console.log('\x1b[32m%s\x1b[0m','Drawn Step "'+step.name+'"');
    }
  };

  events.onRemove = events.onRemove || function(step) {
    if (step.ui == false){
      // No UI
    } else if(step.inBrowser) {
      // Remove the DIV Element
      console.log('Removing Step "'+step.name+'"');
    } else {
      // Delete the NodeJS Object
      console.log('\x1b[31m%s\x1b[0m','Removing Step "'+step.name+'"');
    }
  };

  events.notify = events.notify || function(msg) {
    console.log(msg);
  };

  return events;

};
