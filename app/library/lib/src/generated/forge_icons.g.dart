// Generated from the existing Tabler vector registry (MIT).
// License: app/library/LICENSE-icons.md; regenerate with scripts/generate-flutter-icons.cjs.
import 'package:flutter/painting.dart';

enum ForgeIconName {
  alertTriangle('alert-triangle'),
  arrowLeft('arrow-left'),
  arrowRight('arrow-right'),
  bell('bell'),
  calendar('calendar'),
  check('check'),
  chevronDown('chevron-down'),
  chevronLeft('chevron-left'),
  chevronRight('chevron-right'),
  chevronUp('chevron-up'),
  circleCheck('circle-check'),
  circleX('circle-x'),
  clock('clock'),
  close('close'),
  copy('copy'),
  download('download'),
  edit('edit'),
  externalLink('external-link'),
  eye('eye'),
  eyeOff('eye-off'),
  filter('filter'),
  info('info'),
  logOut('log-out'),
  menu('menu'),
  minus('minus'),
  plus('plus'),
  refresh('refresh'),
  search('search'),
  settings('settings'),
  sortAscending('sort-ascending'),
  sortDescending('sort-descending'),
  spinner('spinner'),
  trash('trash'),
  upload('upload'),
  user('user');

  final String sourceName;
  const ForgeIconName(this.sourceName);
}

class ForgeIconGeometry {
  final List<Path> paths;
  final bool stroke;
  const ForgeIconGeometry(this.paths, this.stroke);
}

final Map<ForgeIconName, ForgeIconGeometry> forgeIconGeometry = {
  ForgeIconName.alertTriangle: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(12, 9);
      path.lineTo(12, 13);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(10.363, 3.591);
      path.lineTo(2.2569999999999997, 17.125);
      path.arcToPoint(Offset(3.893, 19.996),
          radius: Radius.elliptical(1.914, 1.914),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(20.107, 19.996);
      path.arcToPoint(Offset(21.743, 17.125999999999998),
          radius: Radius.elliptical(1.914, 1.914),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(13.636999999999999, 3.589999999999998);
      path.arcToPoint(Offset(10.363, 3.589999999999998),
          radius: Radius.elliptical(1.914, 1.914),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(12, 16);
      path.lineTo(12.01, 16);
      return path;
    }()
  ], true),
  ForgeIconName.arrowLeft: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(5, 12);
      path.lineTo(19, 12);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(5, 12);
      path.lineTo(11, 18);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(5, 12);
      path.lineTo(11, 6);
      return path;
    }()
  ], true),
  ForgeIconName.arrowRight: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(5, 12);
      path.lineTo(19, 12);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(13, 18);
      path.lineTo(19, 12);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(13, 6);
      path.lineTo(19, 12);
      return path;
    }()
  ], true),
  ForgeIconName.bell: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(10, 5);
      path.arcToPoint(Offset(14, 5),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: true,
          clockwise: true);
      path.arcToPoint(Offset(18, 11),
          radius: Radius.elliptical(7, 7),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(18, 14);
      path.arcToPoint(Offset(20, 17),
          radius: Radius.elliptical(4, 4),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(4, 17);
      path.arcToPoint(Offset(6, 14),
          radius: Radius.elliptical(4, 4),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(6, 11);
      path.arcToPoint(Offset(10, 5),
          radius: Radius.elliptical(7, 7),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(9, 17);
      path.lineTo(9, 18);
      path.arcToPoint(Offset(15, 18),
          radius: Radius.elliptical(3, 3),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(15, 17);
      return path;
    }()
  ], true),
  ForgeIconName.calendar: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(4, 7);
      path.arcToPoint(Offset(6, 5),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(18, 5);
      path.arcToPoint(Offset(20, 7),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(20, 19);
      path.arcToPoint(Offset(18, 21),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(6, 21);
      path.arcToPoint(Offset(4, 19),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(4, 7);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(16, 3);
      path.lineTo(16, 7);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(8, 3);
      path.lineTo(8, 7);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(4, 11);
      path.lineTo(20, 11);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(11, 15);
      path.lineTo(12, 15);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(12, 15);
      path.lineTo(12, 18);
      return path;
    }()
  ], true),
  ForgeIconName.check: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(5, 12);
      path.lineTo(10, 17);
      path.lineTo(20, 7);
      return path;
    }()
  ], true),
  ForgeIconName.chevronDown: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(6, 9);
      path.lineTo(12, 15);
      path.lineTo(18, 9);
      return path;
    }()
  ], true),
  ForgeIconName.chevronLeft: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(15, 6);
      path.lineTo(9, 12);
      path.lineTo(15, 18);
      return path;
    }()
  ], true),
  ForgeIconName.chevronRight: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(9, 6);
      path.lineTo(15, 12);
      path.lineTo(9, 18);
      return path;
    }()
  ], true),
  ForgeIconName.chevronUp: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(6, 15);
      path.lineTo(12, 9);
      path.lineTo(18, 15);
      return path;
    }()
  ], true),
  ForgeIconName.circleCheck: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(3, 12);
      path.arcToPoint(Offset(21, 12),
          radius: Radius.elliptical(9, 9),
          rotation: 0,
          largeArc: true,
          clockwise: false);
      path.arcToPoint(Offset(3, 12),
          radius: Radius.elliptical(9, 9),
          rotation: 0,
          largeArc: true,
          clockwise: false);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(9, 12);
      path.lineTo(11, 14);
      path.lineTo(15, 10);
      return path;
    }()
  ], true),
  ForgeIconName.circleX: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(3, 12);
      path.arcToPoint(Offset(21, 12),
          radius: Radius.elliptical(9, 9),
          rotation: 0,
          largeArc: true,
          clockwise: false);
      path.arcToPoint(Offset(3, 12),
          radius: Radius.elliptical(9, 9),
          rotation: 0,
          largeArc: true,
          clockwise: false);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(10, 10);
      path.lineTo(14, 14);
      path.moveTo(14, 10);
      path.lineTo(10, 14);
      return path;
    }()
  ], true),
  ForgeIconName.clock: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(3, 12);
      path.arcToPoint(Offset(21, 12),
          radius: Radius.elliptical(9, 9),
          rotation: 0,
          largeArc: true,
          clockwise: false);
      path.arcToPoint(Offset(3, 12),
          radius: Radius.elliptical(9, 9),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(12, 7);
      path.lineTo(12, 12);
      path.lineTo(15, 15);
      return path;
    }()
  ], true),
  ForgeIconName.close: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(18, 6);
      path.lineTo(6, 18);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(6, 6);
      path.lineTo(18, 18);
      return path;
    }()
  ], true),
  ForgeIconName.copy: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(7, 9.667);
      path.arcToPoint(Offset(9.667, 7),
          radius: Radius.elliptical(2.667, 2.667),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(18.333, 7);
      path.arcToPoint(Offset(21, 9.667),
          radius: Radius.elliptical(2.667, 2.667),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(21, 18.333);
      path.arcToPoint(Offset(18.333, 21),
          radius: Radius.elliptical(2.667, 2.667),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(9.666999999999998, 21);
      path.arcToPoint(Offset(6.999999999999998, 18.333),
          radius: Radius.elliptical(2.667, 2.667),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(6.999999999999998, 9.666999999999998);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(4.012, 16.737);
      path.arcToPoint(Offset(2.9999999999999996, 14.999999999999998),
          radius: Radius.elliptical(2.005, 2.005),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(2.9999999999999996, 4.999999999999998);
      path.cubicTo(2.9999999999999996, 3.899999999999998, 3.8999999999999995,
          2.9999999999999982, 5, 2.9999999999999982);
      path.lineTo(15, 2.9999999999999982);
      path.cubicTo(15.75, 2.9999999999999982, 16.158, 3.384999999999998, 16.5,
          3.9999999999999982);
      return path;
    }()
  ], true),
  ForgeIconName.download: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(4, 17);
      path.lineTo(4, 19);
      path.arcToPoint(Offset(6, 21),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(18, 21);
      path.arcToPoint(Offset(20, 19),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(20, 17);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(7, 11);
      path.lineTo(12, 16);
      path.lineTo(17, 11);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(12, 4);
      path.lineTo(12, 16);
      return path;
    }()
  ], true),
  ForgeIconName.edit: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(7, 7);
      path.lineTo(6, 7);
      path.arcToPoint(Offset(4, 9),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(4, 18);
      path.arcToPoint(Offset(6, 20),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(15, 20);
      path.arcToPoint(Offset(17, 18),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(17, 17);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(20.385, 6.585);
      path.arcToPoint(Offset(17.415000000000003, 3.6149999999999998),
          radius: Radius.elliptical(2.1, 2.1),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(9.000000000000004, 12);
      path.lineTo(9.000000000000004, 15);
      path.lineTo(12.000000000000004, 15);
      path.lineTo(20.385000000000005, 6.585000000000001);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(16, 5);
      path.lineTo(19, 8);
      return path;
    }()
  ], true),
  ForgeIconName.externalLink: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(12, 6);
      path.lineTo(6, 6);
      path.arcToPoint(Offset(4, 8),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(4, 18);
      path.arcToPoint(Offset(6, 20),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(16, 20);
      path.arcToPoint(Offset(18, 18),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(18, 12);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(11, 13);
      path.lineTo(20, 4);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(15, 4);
      path.lineTo(20, 4);
      path.lineTo(20, 9);
      return path;
    }()
  ], true),
  ForgeIconName.eye: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(10, 12);
      path.arcToPoint(Offset(14, 12),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: true,
          clockwise: false);
      path.arcToPoint(Offset(10, 12),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(21, 12);
      path.cubicTo(18.6, 16, 15.6, 18, 12, 18);
      path.cubicTo(8.4, 18, 5.4, 16, 3, 12);
      path.cubicTo(5.4, 8, 8.4, 6, 12, 6);
      path.cubicTo(15.6, 6, 18.6, 8, 21, 12);
      return path;
    }()
  ], true),
  ForgeIconName.eyeOff: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(10.585, 10.587);
      path.arcToPoint(Offset(13.414000000000001, 13.415),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(16.681, 16.673);
      path.arcToPoint(Offset(12, 18),
          radius: Radius.elliptical(8.717, 8.717),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.cubicTo(8.4, 18, 5.4, 16, 3, 12);
      path.cubicTo(4.272, 9.879999999999999, 5.712, 8.322, 7.32, 7.326);
      path.moveTo(10.18, 6.18);
      path.arcToPoint(Offset(12, 6),
          radius: Radius.elliptical(9.055, 9.055),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.cubicTo(15.6, 6, 18.6, 8, 21, 12);
      path.cubicTo(20.334, 13.11, 19.621, 14.067, 18.862000000000002,
          14.870000000000001);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(3, 3);
      path.lineTo(21, 21);
      return path;
    }()
  ], true),
  ForgeIconName.filter: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(4, 4);
      path.lineTo(20, 4);
      path.lineTo(20, 6.172000000000001);
      path.arcToPoint(Offset(19.414, 7.586),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(15.000000000000002, 12);
      path.lineTo(15.000000000000002, 19);
      path.lineTo(9.000000000000002, 21);
      path.lineTo(9.000000000000002, 12.5);
      path.lineTo(4.520000000000001, 7.572);
      path.arcToPoint(Offset(4.000000000000002, 6.227),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(4.000000000000002, 4);
      return path;
    }()
  ], true),
  ForgeIconName.info: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(3, 12);
      path.arcToPoint(Offset(21, 12),
          radius: Radius.elliptical(9, 9),
          rotation: 0,
          largeArc: true,
          clockwise: false);
      path.arcToPoint(Offset(3, 12),
          radius: Radius.elliptical(9, 9),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(12, 9);
      path.lineTo(12.01, 9);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(11, 12);
      path.lineTo(12, 12);
      path.lineTo(12, 16);
      path.lineTo(13, 16);
      return path;
    }()
  ], true),
  ForgeIconName.logOut: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(14, 8);
      path.lineTo(14, 6);
      path.arcToPoint(Offset(12, 4),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(5, 4);
      path.arcToPoint(Offset(3, 6),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(3, 18);
      path.arcToPoint(Offset(5, 20),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(12, 20);
      path.arcToPoint(Offset(14, 18),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(14, 16);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(9, 12);
      path.lineTo(21, 12);
      path.lineTo(18, 9);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(18, 15);
      path.lineTo(21, 12);
      return path;
    }()
  ], true),
  ForgeIconName.menu: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(4, 6);
      path.lineTo(20, 6);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(4, 12);
      path.lineTo(20, 12);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(4, 18);
      path.lineTo(20, 18);
      return path;
    }()
  ], true),
  ForgeIconName.minus: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(5, 12);
      path.lineTo(19, 12);
      return path;
    }()
  ], true),
  ForgeIconName.plus: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(12, 5);
      path.lineTo(12, 19);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(5, 12);
      path.lineTo(19, 12);
      return path;
    }()
  ], true),
  ForgeIconName.refresh: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(20, 11);
      path.arcToPoint(Offset(4.5, 9),
          radius: Radius.elliptical(8.1, 8.1),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.moveTo(4, 5);
      path.lineTo(4, 9);
      path.lineTo(8, 9);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(4, 13);
      path.arcToPoint(Offset(19.5, 15),
          radius: Radius.elliptical(8.1, 8.1),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.moveTo(20, 19);
      path.lineTo(20, 15);
      path.lineTo(16, 15);
      return path;
    }()
  ], true),
  ForgeIconName.search: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(3, 10);
      path.arcToPoint(Offset(17, 10),
          radius: Radius.elliptical(7, 7),
          rotation: 0,
          largeArc: true,
          clockwise: false);
      path.arcToPoint(Offset(3, 10),
          radius: Radius.elliptical(7, 7),
          rotation: 0,
          largeArc: true,
          clockwise: false);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(21, 21);
      path.lineTo(15, 15);
      return path;
    }()
  ], true),
  ForgeIconName.settings: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(10.325, 4.317);
      path.cubicTo(
          10.751, 2.561, 13.248999999999999, 2.561, 13.674999999999999, 4.317);
      path.arcToPoint(Offset(16.247999999999998, 5.383),
          radius: Radius.elliptical(1.724, 1.724),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.cubicTo(
          17.790999999999997, 4.443, 19.557999999999996, 6.209, 18.618, 7.753);
      path.arcToPoint(Offset(19.683, 10.325),
          radius: Radius.elliptical(1.724, 1.724),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.cubicTo(21.439, 10.751, 21.439, 13.248999999999999, 19.683,
          13.674999999999999);
      path.arcToPoint(Offset(18.617, 16.247999999999998),
          radius: Radius.elliptical(1.724, 1.724),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.cubicTo(19.557000000000002, 17.790999999999997, 17.791,
          19.557999999999996, 16.247, 18.618);
      path.arcToPoint(Offset(13.675, 19.683),
          radius: Radius.elliptical(1.724, 1.724),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.cubicTo(13.249, 21.439, 10.751000000000001, 21.439,
          10.325000000000001, 19.683);
      path.arcToPoint(Offset(7.752000000000001, 18.617),
          radius: Radius.elliptical(1.724, 1.724),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.cubicTo(6.2090000000000005, 19.557000000000002, 4.442, 17.791,
          5.382000000000001, 16.247);
      path.arcToPoint(Offset(4.317, 13.675),
          radius: Radius.elliptical(1.724, 1.724),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.cubicTo(
          2.561, 13.249, 2.561, 10.751000000000001, 4.317, 10.325000000000001);
      path.arcToPoint(Offset(5.383, 7.752000000000001),
          radius: Radius.elliptical(1.724, 1.724),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.cubicTo(
          4.443, 6.2090000000000005, 6.209, 4.442, 7.753, 5.382000000000001);
      path.cubicTo(8.753, 5.99, 10.049, 5.452000000000001, 10.325, 4.317);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(9, 12);
      path.arcToPoint(Offset(15, 12),
          radius: Radius.elliptical(3, 3),
          rotation: 0,
          largeArc: true,
          clockwise: false);
      path.arcToPoint(Offset(9, 12),
          radius: Radius.elliptical(3, 3),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      return path;
    }()
  ], true),
  ForgeIconName.sortAscending: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(4, 6);
      path.lineTo(11, 6);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(4, 12);
      path.lineTo(11, 12);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(4, 18);
      path.lineTo(13, 18);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(15, 9);
      path.lineTo(18, 6);
      path.lineTo(21, 9);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(18, 6);
      path.lineTo(18, 18);
      return path;
    }()
  ], true),
  ForgeIconName.sortDescending: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(4, 6);
      path.lineTo(13, 6);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(4, 12);
      path.lineTo(11, 12);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(4, 18);
      path.lineTo(11, 18);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(15, 15);
      path.lineTo(18, 18);
      path.lineTo(21, 15);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(18, 6);
      path.lineTo(18, 18);
      return path;
    }()
  ], true),
  ForgeIconName.spinner: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(12, 3);
      path.arcToPoint(Offset(21, 12),
          radius: Radius.elliptical(9, 9),
          rotation: 0,
          largeArc: true,
          clockwise: false);
      return path;
    }()
  ], true),
  ForgeIconName.trash: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(4, 7);
      path.lineTo(20, 7);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(10, 11);
      path.lineTo(10, 17);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(14, 11);
      path.lineTo(14, 17);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(5, 7);
      path.lineTo(6, 19);
      path.arcToPoint(Offset(8, 21),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(16, 21);
      path.arcToPoint(Offset(18, 19),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(19, 7);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(9, 7);
      path.lineTo(9, 4);
      path.arcToPoint(Offset(10, 3),
          radius: Radius.elliptical(1, 1),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(14, 3);
      path.arcToPoint(Offset(15, 4),
          radius: Radius.elliptical(1, 1),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(15, 7);
      return path;
    }()
  ], true),
  ForgeIconName.upload: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(4, 17);
      path.lineTo(4, 19);
      path.arcToPoint(Offset(6, 21),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(18, 21);
      path.arcToPoint(Offset(20, 19),
          radius: Radius.elliptical(2, 2),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      path.lineTo(20, 17);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(7, 9);
      path.lineTo(12, 4);
      path.lineTo(17, 9);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(12, 4);
      path.lineTo(12, 16);
      return path;
    }()
  ], true),
  ForgeIconName.user: ForgeIconGeometry([
    () {
      final path = Path();
      path.moveTo(8, 7);
      path.arcToPoint(Offset(16, 7),
          radius: Radius.elliptical(4, 4),
          rotation: 0,
          largeArc: true,
          clockwise: false);
      path.arcToPoint(Offset(8, 7),
          radius: Radius.elliptical(4, 4),
          rotation: 0,
          largeArc: false,
          clockwise: false);
      return path;
    }(),
    () {
      final path = Path();
      path.moveTo(6, 21);
      path.lineTo(6, 19);
      path.arcToPoint(Offset(10, 15),
          radius: Radius.elliptical(4, 4),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(14, 15);
      path.arcToPoint(Offset(18, 19),
          radius: Radius.elliptical(4, 4),
          rotation: 0,
          largeArc: false,
          clockwise: true);
      path.lineTo(18, 21);
      return path;
    }()
  ], true),
};
