// Code generated by mockery v2.20.2. DO NOT EDIT.

package mocks

import (
	context "context"

	policy "github.com/odpf/shield/core/policy"
	mock "github.com/stretchr/testify/mock"
)

// PolicyService is an autogenerated mock type for the PolicyService type
type PolicyService struct {
	mock.Mock
}

type PolicyService_Expecter struct {
	mock *mock.Mock
}

func (_m *PolicyService) EXPECT() *PolicyService_Expecter {
	return &PolicyService_Expecter{mock: &_m.Mock}
}

// Create provides a mock function with given fields: ctx, pol
func (_m *PolicyService) Create(ctx context.Context, pol policy.Policy) ([]policy.Policy, error) {
	ret := _m.Called(ctx, pol)

	var r0 []policy.Policy
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, policy.Policy) ([]policy.Policy, error)); ok {
		return rf(ctx, pol)
	}
	if rf, ok := ret.Get(0).(func(context.Context, policy.Policy) []policy.Policy); ok {
		r0 = rf(ctx, pol)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]policy.Policy)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, policy.Policy) error); ok {
		r1 = rf(ctx, pol)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// PolicyService_Create_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'Create'
type PolicyService_Create_Call struct {
	*mock.Call
}

// Create is a helper method to define mock.On call
//   - ctx context.Context
//   - pol policy.Policy
func (_e *PolicyService_Expecter) Create(ctx interface{}, pol interface{}) *PolicyService_Create_Call {
	return &PolicyService_Create_Call{Call: _e.mock.On("Create", ctx, pol)}
}

func (_c *PolicyService_Create_Call) Run(run func(ctx context.Context, pol policy.Policy)) *PolicyService_Create_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(policy.Policy))
	})
	return _c
}

func (_c *PolicyService_Create_Call) Return(_a0 []policy.Policy, _a1 error) *PolicyService_Create_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *PolicyService_Create_Call) RunAndReturn(run func(context.Context, policy.Policy) ([]policy.Policy, error)) *PolicyService_Create_Call {
	_c.Call.Return(run)
	return _c
}

// Get provides a mock function with given fields: ctx, id
func (_m *PolicyService) Get(ctx context.Context, id string) (policy.Policy, error) {
	ret := _m.Called(ctx, id)

	var r0 policy.Policy
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, string) (policy.Policy, error)); ok {
		return rf(ctx, id)
	}
	if rf, ok := ret.Get(0).(func(context.Context, string) policy.Policy); ok {
		r0 = rf(ctx, id)
	} else {
		r0 = ret.Get(0).(policy.Policy)
	}

	if rf, ok := ret.Get(1).(func(context.Context, string) error); ok {
		r1 = rf(ctx, id)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// PolicyService_Get_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'Get'
type PolicyService_Get_Call struct {
	*mock.Call
}

// Get is a helper method to define mock.On call
//   - ctx context.Context
//   - id string
func (_e *PolicyService_Expecter) Get(ctx interface{}, id interface{}) *PolicyService_Get_Call {
	return &PolicyService_Get_Call{Call: _e.mock.On("Get", ctx, id)}
}

func (_c *PolicyService_Get_Call) Run(run func(ctx context.Context, id string)) *PolicyService_Get_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(string))
	})
	return _c
}

func (_c *PolicyService_Get_Call) Return(_a0 policy.Policy, _a1 error) *PolicyService_Get_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *PolicyService_Get_Call) RunAndReturn(run func(context.Context, string) (policy.Policy, error)) *PolicyService_Get_Call {
	_c.Call.Return(run)
	return _c
}

// List provides a mock function with given fields: ctx
func (_m *PolicyService) List(ctx context.Context) ([]policy.Policy, error) {
	ret := _m.Called(ctx)

	var r0 []policy.Policy
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context) ([]policy.Policy, error)); ok {
		return rf(ctx)
	}
	if rf, ok := ret.Get(0).(func(context.Context) []policy.Policy); ok {
		r0 = rf(ctx)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]policy.Policy)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context) error); ok {
		r1 = rf(ctx)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// PolicyService_List_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'List'
type PolicyService_List_Call struct {
	*mock.Call
}

// List is a helper method to define mock.On call
//   - ctx context.Context
func (_e *PolicyService_Expecter) List(ctx interface{}) *PolicyService_List_Call {
	return &PolicyService_List_Call{Call: _e.mock.On("List", ctx)}
}

func (_c *PolicyService_List_Call) Run(run func(ctx context.Context)) *PolicyService_List_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context))
	})
	return _c
}

func (_c *PolicyService_List_Call) Return(_a0 []policy.Policy, _a1 error) *PolicyService_List_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *PolicyService_List_Call) RunAndReturn(run func(context.Context) ([]policy.Policy, error)) *PolicyService_List_Call {
	_c.Call.Return(run)
	return _c
}

// Update provides a mock function with given fields: ctx, pol
func (_m *PolicyService) Update(ctx context.Context, pol policy.Policy) ([]policy.Policy, error) {
	ret := _m.Called(ctx, pol)

	var r0 []policy.Policy
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, policy.Policy) ([]policy.Policy, error)); ok {
		return rf(ctx, pol)
	}
	if rf, ok := ret.Get(0).(func(context.Context, policy.Policy) []policy.Policy); ok {
		r0 = rf(ctx, pol)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]policy.Policy)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, policy.Policy) error); ok {
		r1 = rf(ctx, pol)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// PolicyService_Update_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'Update'
type PolicyService_Update_Call struct {
	*mock.Call
}

// Update is a helper method to define mock.On call
//   - ctx context.Context
//   - pol policy.Policy
func (_e *PolicyService_Expecter) Update(ctx interface{}, pol interface{}) *PolicyService_Update_Call {
	return &PolicyService_Update_Call{Call: _e.mock.On("Update", ctx, pol)}
}

func (_c *PolicyService_Update_Call) Run(run func(ctx context.Context, pol policy.Policy)) *PolicyService_Update_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(policy.Policy))
	})
	return _c
}

func (_c *PolicyService_Update_Call) Return(_a0 []policy.Policy, _a1 error) *PolicyService_Update_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *PolicyService_Update_Call) RunAndReturn(run func(context.Context, policy.Policy) ([]policy.Policy, error)) *PolicyService_Update_Call {
	_c.Call.Return(run)
	return _c
}

type mockConstructorTestingTNewPolicyService interface {
	mock.TestingT
	Cleanup(func())
}

// NewPolicyService creates a new instance of PolicyService. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
func NewPolicyService(t mockConstructorTestingTNewPolicyService) *PolicyService {
	mock := &PolicyService{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
