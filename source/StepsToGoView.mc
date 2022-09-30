using Toybox.Activity;
using Toybox.Lang;
using Toybox.WatchUi;
using Toybox.Time;

class StepsToGoalView extends WatchUi.SimpleDataField {
	function initialize () {
		SimpleDataField.initialize();

		label = Application.loadResource(Rez.Strings.StepsToGoal).toString();
	}

	function compute (info as Activity.Info) as Lang.Numeric or Time.Duration or Lang.String or Null {
		var stepsToGoal = getStepsToGoal();

		if (stepsToGoal < 0) {
			return "+" + -stepsToGoal + " ";
		}

		return stepsToGoal;
	}

	protected function getStepsToGoal () as Lang.Numeric {
		var activityMonitorInfo = Toybox.ActivityMonitor.getInfo();

		var steps = activityMonitorInfo.steps;
		var stepGoal = activityMonitorInfo.stepGoal;

		if (steps == null) {
			return 0;
		}

		if (stepGoal == null) {
			return -steps;
		}

		return stepGoal - steps;
	}
}
